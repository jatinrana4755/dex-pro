import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'float'
})
export class FloatPipe implements PipeTransform {

    transform(text): any {
            return parseFloat(text);
    }
}
