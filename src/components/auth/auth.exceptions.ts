import {
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

export class RecaptchaVerificationError extends InternalServerErrorException {
  constructor() {
    super('RECAPTCHA_VERIFICATION_ERROR');
  }
}

export class UserUnauthorizedError extends UnauthorizedException {
  constructor() {
    super('USER_UNAUTHORIZED_ERROR');
  }
}
