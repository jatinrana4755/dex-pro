import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { SearchPipe } from './search.pipe';

@NgModule({
  declarations: [
      SearchPipe
      ],
  providers: [SearchPipe],
  exports: [SearchPipe]
})
export class SearchPipeModule { }
