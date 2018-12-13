import { Pipe, PipeTransform } from '@angular/core';
import { SharedService } from './../../providers/shared.service';


@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {


  constructor(private ss: SharedService) { }
  transform(value: any, searchtext: string, term: any): any {
    if (!searchtext) {
      return value;
    }
    if (value) {
      return value.filter(it => {
        return it[term].toLowerCase().includes(searchtext.toLowerCase());

      });
    }
    return [];

  }


}
