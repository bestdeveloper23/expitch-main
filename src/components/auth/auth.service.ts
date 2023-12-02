import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { EnvironmentVariables } from 'src/config/environment.schema';
import {
  RecaptchaVerificationError,
  UserUnauthorizedError,
} from './auth.exceptions';
import * as stytch from 'stytch';
import { UserService } from '../user/user.service';

interface RecaptchaResponse {
  success: boolean;
}

@Injectable()
export class AuthService {
  private readonly recaptchaSecretKey: string;
  private readonly env: string;
  private readonly client: stytch.Client;
  private readonly sessionTime = 43200;

  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly userService: UserService,
  ) {
    this.recaptchaSecretKey = this.configService.get('RECAPTCHA_SECRET_KEY');
    this.env = this.configService.get('NODE_ENV');
    this.client = new stytch.Client({
      project_id: this.configService.get('STYTCH_PROJECT_ID'),
      secret: this.configService.get('STYTCH_SECRET'),
      env: stytch.envs.test,
    });
  }
  // change envs to live when ready?

  async validateRecaptcha(token: string): Promise<RecaptchaResponse> {
    if (this.env === 'development') {
      return { success: true };
    }

    const captchaApiUrl = 'https://www.google.com/recaptcha/api/siteverify';

    const data = {
      secret: this.recaptchaSecretKey,
      response: token,
    };

    const body = `secret=${data.secret}&response=${data.response}`;

    return axios
      .post(captchaApiUrl, body)
      .then((response) => {
        if (!response.data.success) {
          throw new RecaptchaVerificationError();
        }

        return { success: true };
      })
      .catch(() => {
        throw new RecaptchaVerificationError();
      });
  }

  async loginOrCreateUserWithMagicLink(email: string) {

    const envUrl = process.env.NODE_ENV;
    let loginUrl: string;
    let signupUrl: string;
      switch (envUrl) {
        case 'development':
          loginUrl = 'http://localhost:3000/verifyuser';
          signupUrl = 'http://localhost:3000/verifyuser';
          break;
        case 'staging':
          loginUrl = 'https://client-staging.expitch.com/verifyuser';
          signupUrl = 'https://client-staging.expitch.com/verifyuser';
          break;
        case 'production':
          loginUrl = 'https://www.expitch.com/verifyuser';
          signupUrl = 'https://www.expitch.com/verifyuser';
          break;
        default:
          loginUrl = 'http://localhost:3000';
          signupUrl = 'http://localhost:3000';
          break;
  }


    const params = {
      email: email,
      login_magic_link_url: loginUrl,
      signup_magic_link_url: signupUrl,
    };

    const user = await this.userService.findOneOrNull({ email });
    console.log(email, user, params);

    if (!user) {
      await this.userService.createUser(email);
    }

    const response = await this.client.magicLinks.email.loginOrCreate(params);
    console.log(response);
  }

  async authenticateStytchToken(token: string) {
    console.log('token', token);
    try {
      const response = await this.client.magicLinks.authenticate({
        token,
        session_duration_minutes: this.sessionTime,
      });
      console.log(response);

      console.log('response.user.emails', response.user.emails);

      const responseEmails = await this.userService.updateUserStytchIdAndVerify(
        response.user.emails[0].email,
        response.user_id,
        response.user.emails[0].verified,
      );

      return {
        sessionJwt: response.session_jwt,
        sessionToken: response.session_token,
        email: response.user.emails[0].email,
        user_id: response.user_id,
      };
    } catch (error) {
      console.log('MagicLink error', error);
      throw new UserUnauthorizedError();
    }
  }

  async authenticateSession(sessionJwt: string, sessionToken: string) {
    try {
      const response = await this.client.sessions.authenticate({
        session_token: sessionToken,
        // session_jwt: sessionJwt,
        session_duration_minutes: this.sessionTime,
      });
      console.log('Session authenticated...');
    } catch (error) {
      console.log('Session token error', error);
      throw new UserUnauthorizedError();
    }
  }

  async revokeSession(sessionJwt: string, sessionToken: string) {
    try {
      const response = await this.client.sessions.revoke({
        session_token: sessionToken,
        // session_jwt: sessionJwt,
      });

      console.log(response);
    } catch (error) {
      console.log('Session token error', error);
      throw new UserUnauthorizedError();
    }
  }
}
