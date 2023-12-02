import { HttpException, HttpStatus } from '@nestjs/common';

export class MissingDtoException extends HttpException {
  constructor() {
    super('MISSING_DATA', HttpStatus.BAD_REQUEST);
  }
}
