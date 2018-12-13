import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';


declare var $: any;


@Component({
  selector: 'app-trade-history',
  templateUrl: './trade-history.component.html',
  styleUrls: ['./trade-history.component.css']
})
export class TradeHistoryComponent implements OnInit {
  public allData: any;
reverseSort: boolean;
    orderByField: any;
  coin: any;
  user: any;
  myTrade: any;
  date1: any;
  date2: any;
  tradeLoader: boolean;
  constructor(private os: OrdersService) { }

  ngOnInit() {
       this.coin = localStorage.getItem('coinId');
    this.user = localStorage.getItem('DUserId');
    this.getTradeHistory();
  }
  getTradeHistory(){
    this.tradeLoader = true;
    this.os.getMyTrade(this.coin, this.user).subscribe((res: any) => {
      this.myTrade = res;
      this.tradeLoader = false;
    }, err => {
      this.tradeLoader = false;
      this.myTrade = [];
    });
  }

}
