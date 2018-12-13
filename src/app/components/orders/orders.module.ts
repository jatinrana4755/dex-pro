import { CommonModule } from '@angular/common';
import { FooterModule } from './../footer/footer.module';
import { NavLoggedInModule } from './../nav-logged-in/nav-logged-in.module';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdersComponent } from './orders.component';
import { TradeHistoryComponent } from './trade-history/trade-history.component'
import { OpenOrdersComponent } from './open-orders/open-orders.component';
import { OrdersService } from './orders.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../../shared/shared.module';
import { SortPipeModule } from './../../filters/sort/sort.module';
 import {DatePipeModule } from './../../filters/date/date.module';
 import {DecimalPipeModule } from './../../filters/decimal/decimal.module';
import { FloatPipeModule } from './../../filters/float/float.module';

@NgModule({
    imports: [
        FooterModule,
        NavLoggedInModule,
        FormsModule,
        CommonModule,
        SharedModule,
        SortPipeModule,
        DatePipeModule,
        DecimalPipeModule,
        FloatPipeModule,
        RouterModule.forChild([
            {
                path: '', component: OrdersComponent,
                children: [
                    { path: 'open', component: OpenOrdersComponent },
                    { path: 'trade-history', component: TradeHistoryComponent },
                ]
            }

        ]), HttpModule, HttpClientModule
    ],
    exports: [  ],
    declarations: [ 
        OrdersComponent,
        TradeHistoryComponent
        // DatePipe
    ],
    providers: [OrdersService],

})

export class OrdersModule { }
