import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'balance'
})
export class BalancePipe implements PipeTransform {

  transform(items: any, term: any): any {
    if (term === true) {
      return items.filter(item => item.usd_value != 0);
    }
    return items;
}
}
