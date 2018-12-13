import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { RouterModule, Routes } from '@angular/router';
import { OpenOrdersComponent } from './../components/orders/open-orders/open-orders.component'
import { DatePipeModule } from './../filters/date/date.module';
import { SortPipeModule } from './../filters/sort/sort.module';
import { DecimalPipeModule } from './../filters/decimal/decimal.module';
import { FloatPipeModule } from './../filters/float/float.module';
@NgModule({
  imports: [
    CommonModule,
    DatePipeModule,
    FormsModule,
    SortPipeModule,
    DecimalPipeModule,
    FloatPipeModule
    ],
  declarations: [
    OpenOrdersComponent
  ],
  exports: [ OpenOrdersComponent ]
})
export class SharedModule { }
