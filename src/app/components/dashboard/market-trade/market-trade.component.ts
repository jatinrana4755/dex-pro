import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../../../providers/app.service';

@Component({
  selector: 'app-market-trade',
  templateUrl: './market-trade.component.html',
  styleUrls: ['./market-trade.component.css']
})
export class MarketTradeComponent implements OnInit {
@Input() markettrades: any;
mytrades: any;
loadermarket: boolean=true;
loadermytrade: boolean=true;
  constructor(private app:AppService) { }

  ngOnInit() {
    this.getMarketTrade();
    this.getMyTrade();
  }

  getMarketTrade() {
    const formData = new FormData();
    formData.append('coin', localStorage.getItem('coinId'));
    this.app.getMarketTrade(formData).subscribe((res: any) => {
      this.loadermarket = false;
      this.markettrades = res;
    }, (error: any) => {
        this.loadermarket = false;
        this.markettrades = [];
      });
  }

    getMyTrade() {
      const formData = new FormData();
    formData.append('user', localStorage.getItem('DUserId'));
    formData.append('coin', localStorage.getItem('coinId'));
      this.app.getMyTrade(formData).subscribe((res: any) => {
        this.loadermytrade = false;
        this.mytrades = res;
      },(error: any) => {
          this.loadermytrade = false;
          this.mytrades=[]
      });
    }
}
