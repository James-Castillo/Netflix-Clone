import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'description',
})
export class DescriptionPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return `${value.substring(0, 140)}...`;
  }
}
