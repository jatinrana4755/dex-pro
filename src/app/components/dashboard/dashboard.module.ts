import { CoreModule } from './../../core/core.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AngularFirestore } from 'angularfire2/firestore';
import {  ReactiveFormsModule } from '@angular/forms';
import {NgxPageScrollModule} from 'ngx-page-scroll';
// Firebase config
export const firebaseConfig = {
         apiKey: 'AIzaSyCledcw9FyfK9tVYoyKP-Yn-KaTECVGxqc',
         authDomain: 'imdex-54eca.firebaseapp.com',
         databaseURL: 'https://imdex-54eca.firebaseio.com',
         projectId: 'imdex-54eca',
         storageBucket: '',
         messagingSenderId: '564392696356'
};


import {FooterModule} from './../footer/footer.module';
// components
import { TwitterComponent } from './twitter/twitter.component';
import { MarketTradeComponent } from './market-trade/market-trade.component';
import { BuySellComponent } from './buy-sell/buy-sell.component';
import { AnyChartComponent } from './any-chart/any-chart.component';


// import { FooterModule } from './../footer/footer.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { NavLoggedInModule } from './../nav-logged-in/nav-logged-in.module';
import { NavModule } from './../nav/nav.module';
import { FormsModule } from '@angular/forms';
import { SearchPipeModule } from './../../filters/search/search.module';
import { OrdersService } from '../orders/orders.service';
import { AnyChartService } from '../../providers/any-chart.service';
import { ChatComponent } from './chat/chat.component';
import { DecimalPipeModule } from './../../filters/decimal/decimal.module';
import { FloatPipeModule } from './../../filters/float/float.module';
import { SortPipeModule } from './../../filters/sort/sort.module';


@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    NavModule,
    NavLoggedInModule,
    FormsModule,
    SharedModule,
    FooterModule,
    ReactiveFormsModule,
    SearchPipeModule,
    DecimalPipeModule,
    FloatPipeModule,
    SortPipeModule,
    NgxPageScrollModule,
    RouterModule.forChild([
      {path: '', component: DashboardComponent},
    ]),
    AngularFireModule.initializeApp(firebaseConfig)
    // FooterModule
  ],
  declarations: [
    MarketTradeComponent,
    DashboardComponent,
    TwitterComponent,
    BuySellComponent,
    ChatComponent,
    AnyChartComponent
  //  OpenOrdersComponent
  ],
  exports: [
    MarketTradeComponent,
    // BuySellComponent
  ],
  providers: [
    OrdersService,
    AngularFireDatabase,
    AngularFirestore,
    AnyChartService
  ],

})
export class DashboardModule { }
