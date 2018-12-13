import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

// components goes here
import { CreateComponent } from './../components/create/create.component';
import { ChangeWalletComponent } from './../components/changewallet/changewallet.component';

// import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/admin-login/login.component';

// services goes here
import { AppService } from './../providers/app.service';
import { AuthService } from './../providers/auth.service';
import { SharedService } from './../providers/shared.service';

import { NavLoggedInModule } from '../components/nav-logged-in/nav-logged-in.module';
import { NavModule } from '../components/nav/nav.module';
import { FooterModule } from '../components/footer/footer.module';
import { AuthGuard } from './../providers/auth.guard';
import { AdminGuard } from './../providers/admin.guard';

@NgModule({
  declarations: [
    // DashboardComponent,
    HomeComponent,
    CreateComponent,
    ChangeWalletComponent,
    LoginComponent,
  ], 
  imports: [
    NavLoggedInModule,
    // DashboardModule,
    NavModule,
    FooterModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    AppService, AuthService, SharedService
  ],
  exports: [
  ]
})
export class CoreModule { }
