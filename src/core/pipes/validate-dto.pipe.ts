import { Injectable, PipeTransform } from '@nestjs/common';
import { MissingDtoException } from './missing-dto.exceptions';

@Injectable()
export class ValidateDtoPipe implements PipeTransform {
  transform(value: any) {
    if (!value) {
      throw new MissingDtoException();
    }
    return value;
  }
}
