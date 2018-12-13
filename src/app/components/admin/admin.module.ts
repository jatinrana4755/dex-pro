import { CoreModule } from './../../core/core.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { CoinsComponent } from './coins/coins.component';
import { FeesComponent } from './fees/fees.component';
import { NoticeComponent } from './notice/notice.component';
// import { TakerFeeComponent } from './taker-fee/taker-fee.component';
import { AdminDataService } from '../../providers/admin-data.service';
import { NgForm } from '@angular/forms';


import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component'
import { SearchPipeModule } from './../../filters/search/search.module';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    SearchPipeModule,
    NgxPaginationModule,
    RouterModule.forChild([
      { path: '', component: AdminComponent,
    children: [
        { path: 'coin', component: CoinsComponent },
        { path: 'fee', component: FeesComponent },
        { path: 'notice', component: NoticeComponent },
        // { path: 'taker-fee', component: TakerFeeComponent },
    ]
  }
    ])
  ],
  declarations: [
    AdminComponent,
    CoinsComponent,
    FeesComponent,
    NoticeComponent,
    NavbarComponent,
    SidebarComponent,
  ],
  exports: [
  ],
  providers: [
   AdminDataService,NgForm
  ],

})
export class AdminModule { }
