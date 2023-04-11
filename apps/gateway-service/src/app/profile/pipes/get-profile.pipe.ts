import { Injectable, PipeTransform } from '@nestjs/common';
import { GetProfileDto } from '@immensus/data-access-services';

@Injectable()
export class GetProfilePipe implements PipeTransform {
  transform(value: GetProfileDto): GetProfileDto {
    return {
      ...value,
      id: value.id && +value.id,
    };
  }
}
