import { BadRequestException } from '@nestjs/common';

export class GptException extends BadRequestException {
  constructor(message) {
    super('GPT_EXCEPTION: ' + message);
  }
}

export class FileNotProvidedException extends BadRequestException {
  constructor() {
    super('FILE_NOTE_PROVIDED_EXCEPTION');
  }
}

export class InvalidFileTypeException extends BadRequestException {
  constructor() {
    super('INVALID_FILE_TYPE_EXCEPTION');
  }
}

export class NotAPitchException extends BadRequestException {
  constructor() {
    super('PROVIDED_TEXT_NOT_A_PITCH');
  }
}

export class ErrorWhileAudioTranscriptionException extends BadRequestException {
  constructor() {
    super('ERROR_WHILE_AUDIO_TRANSCRIPTION');
  }
}
