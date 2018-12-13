import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { CreateComponent } from '../components/create/create.component';
import { ChangeWalletComponent } from '../components/changewallet/changewallet.component';
import { HomeComponent } from '../components/home/home.component';
import { AuthGuard } from './../providers/auth.guard';
import { AdminGuard } from './../providers/admin.guard';
import { LoginComponent } from '../components/admin-login/login.component'; 

const routes: Routes = [
  
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'dashboard',redirectTo:'dashboard/coin/eth',pathMatch:'full'},
  { path: 'home', component: HomeComponent },
  { path: 'adminlogin', component: LoginComponent},
  { path: 'dashboard/:coin/:type',loadChildren: 'app/components/dashboard/dashboard.module#DashboardModule', runGuardsAndResolvers: 'always' },
  { path: 'create', component: CreateComponent },
  { path: 'change-wallet', component: ChangeWalletComponent },
  { path: 'balance', loadChildren: 'app/components/balance/balance.module#BalanceModule' , canActivate: [AuthGuard]},
  // { path: '**', redirectTo: 'login', pathMatch: 'full' }
  { path: 'orders', loadChildren: 'app/components/orders/orders.module#OrdersModule' ,canActivate: [AuthGuard]},
  
   {path: 'admin', loadChildren: 'app/components/admin/admin.module#AdminModule', canActivate: [AdminGuard]},
  // { path: '**', redirectTo: 'login', pathMatch: 'full' }
  { path: 'help', loadChildren: 'app/components/help/help.module#HelpModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
