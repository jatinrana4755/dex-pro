import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { DatePipe } from './date.pipe';

@NgModule({
  declarations: [
      DatePipe
      ],
  providers: [DatePipe],
  exports: [DatePipe]
})
export class DatePipeModule { }
