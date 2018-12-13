import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimal'
})
export class DecimalPipe implements PipeTransform {

  transform(text): any {
    // text = parseFloat(text);
    return parseFloat(text).toFixed(10).replace(/0+$/, '');
  }
  }
