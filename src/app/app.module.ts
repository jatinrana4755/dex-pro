import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
// core module includes the commom modules to be shared throughout the application
import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './routes/app.routes';
import { NgProgressModule } from 'ngx-progressbar';

// common services goes here

@NgModule({
  declarations: [
    AppComponent,
      ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    NgProgressModule
  ],
  providers: [],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
