import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FloatPipe } from './float.pipe';

@NgModule({
  declarations: [
      FloatPipe
      ],
  providers: [FloatPipe],
  exports: [FloatPipe]
})
export class FloatPipeModule { }
