import { InternalServerErrorException } from '@nestjs/common';

export class FileUploadException extends InternalServerErrorException {
  constructor() {
    super('FILE_UPLOAD_ERROR');
  }
}
