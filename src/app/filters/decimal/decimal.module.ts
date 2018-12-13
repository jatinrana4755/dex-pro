import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { DecimalPipe } from './decimal.pipe';

@NgModule({
  declarations: [
      DecimalPipe
      ],
  providers: [DecimalPipe],
  exports: [DecimalPipe]
})
export class DecimalPipeModule { }
