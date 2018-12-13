import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../../../providers/app.service';
import { AuthService } from '../../../providers/auth.service';
import { SharedService } from '../../../providers/shared.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from '../dashboard.component';

declare const $: any;
@Component({
  selector: 'app-buy-sell',
  templateUrl: './buy-sell.component.html',
  styleUrls: ['./buy-sell.component.css']
})
export class BuySellComponent implements OnInit {
  buyform: any;
  sellform: any;
  buyprice: any;
  buyamount: any;
  bordertype: any;
  sellPrice: any;
  sellAmount: any;
  sordertype: any;
  sellSum = 0;
  buySum = 0;
  sellFee = 0;
  buyFee = 0;
  @Input() selectedCoin: any;
  // coinType: any;
  buysubmit = true;
  @Input() Cointype: any;
  @Input() chatSocket: any;
  loggedIn: any;
  buyLoad: boolean;
  sellLoad: any;
  highestbprice: any;
  coinType: any;
  primarycoin: any;
  lowestsprice: any;
  user: any;
  coinId: any;
  constructor(public app: AppService, public auth: AuthService, public fb: FormBuilder, public ss: SharedService) {
  }

  ngOnInit() {

    this.getFee();
    this.Query();
    // this.selectedCoin = localStorage.getItem('coinName');
    // this.coinType = localStorage.getItem('coinType');
    this.loggedIn = this.auth.isLoggedIn();
    this.buyform = this.buyForm();
    this.sellform = this.sellForm();
    this.user = localStorage.getItem('DUserId');
    this.coinId = localStorage.getItem('coinId');
    this.coinType = localStorage.getItem('coinType');
    if (this.coinType == 'eth') {
      this.primarycoin = 0;
    }
    if (this.coinType == 'tm') {
      this.primarycoin = 1;
    }
  }

  decimalValidator(control: FormControl) {
    if (control.value) {
      const string = JSON.stringify(control.value);
      if (string) {
        const split = string.split('.');
        if (split[1]) {
          if (split[1].length < 8) {
            return null;
          } else {
            return {
              decimal8: {
                parsedDomain: control.value
              }
            };
          }
        }
      }
    }
    return null;
  }

  buyForm() {
    return this.fb.group({
      bordertype: ['limit', [Validators.required]],
      buyamount: ['', [Validators.required, this.decimalValidator]],
      buyprice: ['', [Validators.required, this.decimalValidator]]
    });
  }

  sellForm() {
    return this.fb.group({
      sordertype: ['limit', [Validators.required]],
      sellAmount: ['', [Validators.required, this.decimalValidator]],
      sellPrice: ['', [Validators.required, this.decimalValidator]]
    });
  }


  buyCoin() {
    this.buyLoad = true;
    const formData = new FormData();
    formData.append('coin', parseInt(localStorage.getItem('coinId'), 0).toFixed());
    formData.append('volume', this.buyform.get('buyamount').value);
    formData.append('initial_vol', this.buyform.get('buyamount').value);
    formData.append('user', localStorage.getItem('DUserId'));
    formData.append('price', this.buyform.get('buyprice').value);
    formData.append('ordertype', this.buyform.get('bordertype').value);
    formData.append('tmmarket', this.primarycoin);
    this.app.buyCoin(formData).subscribe((res: any) => {
      this.chatSocket.send({ 'data': 'ok' });
      console.log(this.chatSocket);
      this.buyLoad = false;
      Swal(JSON.stringify(res.message));
    }, err => {
      Swal('Something Went Wrong!!', 'Please Try Again', 'error');
      this.buyLoad = false;
    });
    this.buyform.reset();
  }

  sellCoin() {
    this.sellLoad = true;
    const formData = new FormData();
    formData.append('coin', parseInt(localStorage.getItem('coinId'), 0).toFixed(0));
    formData.append('volume', this.sellform.get('sellAmount').value);
    formData.append('initial_vol', this.sellform.get('sellAmount').value);
    formData.append('user', localStorage.getItem('DUserId'));
    formData.append('price', this.sellform.get('sellPrice').value);
    formData.append('ordertype', this.sellform.get('sordertype').value);
    formData.append('tmmarket', this.primarycoin);
    this.app.saleCoin(formData).subscribe((res: any) => {
      this.chatSocket.send({ 'data': 'ok' });
      this.sellLoad = false;
      Swal(JSON.stringify(res.message));
    }, err => {
      this.sellLoad = false;
      Swal('Something Went Wrong!!', 'Please Try Again', 'error');
    });
    this.sellform.reset();
  }

  takerFee = 0;
  makerFee = 0;
  getFee() {
    this.app.getFee().subscribe(res => {
      this.takerFee = res[1].value;
      this.makerFee = res[0].value;
    });
  }

  checkbuyOrder() {
    if (this.buyform.get('bordertype').value == 'market') {
      this.lowestsprice = 0
      if (!this.lowestsprice) {
        console.log('if')
        Swal('No orders Available');
        this.buyform.get('bordertype').value == 'limit'
      } else {
        console.log('else')
        $('#buyprice').hide();
        this.buyform.get('buyprice').value = this.lowestsprice;
      }
    }
    if (this.buyform.get('bordertype').value == 'limit') {
      this.buyform.get('bordertype').value = 'limit';
      $('#buyprice').show();
    }

  }



  checksellOrder() {
    console.log('sell')
    if (this.sellform.get('sordertype').value == 'market') {
      if (!this.highestbprice) {
        Swal('No orders Available');
        this.sellform.get('sordertype').value = 'limit'
      } else {
      this.sellform.get('sellPrice').value = this.highestbprice;        
        this.sellform.get('sordertype').value = 'market'
        $('#saleprice').hide();
      }
    }
    if (this.sellform.get('sordertype').value == 'limit') {
      this.sellform.get('sordertype').value = 'limit';
      $('#saleprice').show();
    }
  }

  Query() {
    const data = new FormData();
    data.append('user', localStorage.getItem('DUserId'));
    data.append('coin', localStorage.getItem('coinId'));
    // data.append('primarycoin', this.primarycoin);
    this.ss.Query(data).subscribe((res: any) => {
      console.log(res);
      if (res.sell_order.price != undefined) {
        this.lowestsprice = res.sell_order.price;
      }
      if (res.buy_order.price != undefined) {
        this.highestbprice = res.buy_order.price;
      }
    });
  }

}
