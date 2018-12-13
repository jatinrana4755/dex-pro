import { FooterComponent } from './../footer/footer.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FullBalanceComponent} from './full-balances/full-balances.component';
import { BalanceHistoryComponent } from './balance-history/balance-history.component';
import { BalanceComponent } from './balance.component';
import { RouterModule, Routes } from '@angular/router';
import { FooterModule } from './../footer/footer.module';
import { NavLoggedInModule } from './../nav-logged-in/nav-logged-in.module';
import { BalanceService } from './balance.service';
import {CommonModule} from '@angular/common';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { BalancePipe } from './../../filters/balance.pipe';
import { DatePipeModule } from './../../filters/date/date.module';
import { SearchPipeModule } from './../../filters/search/search.module';
import { SortPipeModule } from './../../filters/sort/sort.module';
import { FloatPipeModule } from './../../filters/float/float.module';
import { DecimalPipeModule } from './../../filters/decimal/decimal.module';
@NgModule({
    imports: [
        NavLoggedInModule,
        FooterModule,
        FormsModule,
        CommonModule,
        InfiniteScrollModule,
        DatePipeModule,
        SearchPipeModule,
        SortPipeModule,
        DecimalPipeModule,
        FloatPipeModule,
        RouterModule.forChild([
            { path: '', component: BalanceComponent ,
                children: [
                    { path: 'full', component: FullBalanceComponent, },
                    { path: 'history', component: BalanceHistoryComponent, }
                ]
            },
        ])
    ],
    exports: [],
    declarations: [
        BalanceComponent,
        FullBalanceComponent,
        BalanceHistoryComponent,
        BalancePipe,
    ],
    providers: [BalanceService]
})

export class BalanceModule {}
