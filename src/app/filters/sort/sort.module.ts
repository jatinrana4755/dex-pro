import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { SortPipe } from './sort.pipe';

@NgModule({
  declarations: [
      SortPipe
      ],
  providers: [SortPipe],
  exports: [SortPipe]
})
export class SortPipeModule { }
