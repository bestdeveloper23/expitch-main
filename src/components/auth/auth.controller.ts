import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ValidateDtoPipe } from 'src/core/pipes/validate-dto.pipe';
import { LoginInput } from './dto/login.input';
import { Response } from 'express';
import { VerifyTokenInput } from './dto/verify-token.input';
import { VerifySessionInput } from './dto/session.input';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async sendMagicLink(
    @Body(new ValidateDtoPipe()) loginInput: LoginInput,
    @Res() res: Response,
  ) {
    await this.authService.validateRecaptcha(loginInput.recaptchaToken);

    const result = await this.authService.loginOrCreateUserWithMagicLink(
      loginInput.email,
    );

    res.status(200).send({
      message: 'Success',
      data: result,
    });
  }

  @Post('/verify-user')
  async authenticateUser(
    @Body(new ValidateDtoPipe()) input: VerifyTokenInput,
    @Res() res: Response,
  ) {
    await this.authService.validateRecaptcha(input.recaptchaToken);
    const result = await this.authService.authenticateStytchToken(input.token);

    res.status(200).send({
      message: 'Success',
      data: result,
    });
  }

  @Post('/verify-session')
  async verifySession(
    @Body(new ValidateDtoPipe()) input: VerifySessionInput,
    @Res() res: Response,
  ) {
    
    const result = await this.authService.authenticateSession(
      input.sessionJwt,
      input.sessionToken,
    );

    res.status(200).send({
      message: 'Success',
    });
  }

  @Post('/logout')
  async logout(
    @Body(new ValidateDtoPipe()) input: VerifySessionInput,
    @Res() res: Response,
  ) {
    console.log(input);
    await this.authService.validateRecaptcha(input.recaptchaToken);
    const result = await this.authService.revokeSession(
      input.sessionJwt,
      input.sessionToken,
    );

    res.status(200).send({
      message: 'Success',
    });
  }
}
