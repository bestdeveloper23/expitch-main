import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'fileType', async: false })
export class FileTypeValidator implements ValidatorConstraintInterface {
  validate(file: Express.Multer.File) {
    const allowedTypes = [
      'audio/mp3',
      'audio/mp4',
      'video/mp4',
      'audio/mpeg',
      'video/mpeg',
      'audio/x-m4a',
      'audio/m4a',
      'audio/wav',
      'audio/wave',
      'video/webm',
    ];
    return allowedTypes.includes(file.mimetype);
  }

  defaultMessage() {
    return 'Invalid file type. Only mp3, mp4, mpeg, mpga, m4a, wav, and webm files are allowed.';
  }
}
