import { Component, OnInit, Output, Input, ViewChild, ElementRef } from '@angular/core';
import { SharedService } from './../../providers/shared.service';
import { AuthService } from './../../providers/auth.service';
import { AppService } from './../../providers/app.service';
import { PageScrollConfig } from 'ngx-page-scroll';
import { RouterModule, Router } from '@angular/router';
// import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import {
    widget,
    onready,
    ChartingLibraryWidgetOptions,
    LanguageCode,
} from '../../../assets/charting_library/charting_library.min';
// import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
const socket_url = 'ws://18.191.183.58:8000/ws/exchange/OrderList/';
declare const $: any;
declare const TradingView: any;
declare const Datafeeds: any;
declare const twttr: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('sidenav') sidenav: ElementRef;
  twitter: any;
  selectedCoinData: any;
  loaderask: Boolean = false;
  loadercoin: Boolean = false;
  balanceloader: Boolean = false;
  allCoins: any;
  isLoggedIn: any;
  eth = [];
  ethCopy = [];
  tm = [];
  tmCopy = [];
  price: any;
  data: any;
  user: any;
  coin: any;
  lastPrice: any;
  address: any;
  @Output() selectedCoin: any;
  @Output() Cointype: any;
  @Output() chatSocket: any;
  @Output() markettrades: any;
  chartCoin: any;
  search: any;
message:any;
  sum;
  // star coins
  onlyfavEthArr = [];
  onlyfavTmArr = [];
  onlyFavEth = {};
  onlyFavTm = {};
  arrayEth: any;
  showAllCoin: any;
  arrayTM: any;
  checkboxTmFav = false;
  checkboxEthFav = false;
  coinId: any;
  tokenPrice: any;
  allBalances: any;
  zeroBalAvail: any;
  lowestsprice
  icon: any;
  selectedCoinDetails = {};
  coinType:any;
  askData = [];
  bidData = [];
  selectedCoinLatestPrice: any;
  // selectedmarket: { 'id': '0',
  //  'name': 'Limit' }
  orderByField: any;
  reverseSort = false;
  term = '';
  primarycoin:any;
  loadBalance = false;
  chartType: number;
  private _selectedCoin = localStorage.getItem('coinName');
  private _symbol: ChartingLibraryWidgetOptions['symbol'] = 'ETH_'+this._selectedCoin;
  private _interval: ChartingLibraryWidgetOptions['interval'] = 'D';
  // BEWARE: no trailing slash is expected in feed URL
  //private _datafeedUrl = 'https://demo_feed.tradingview.com';
  //private _datafeedUrl = 'http://18.191.183.58:8000';
  private _datafeedUrl = 'http://104.237.156.106:8000';
  private _libraryPath: ChartingLibraryWidgetOptions['library_path'] = '/assets/charting_library/';
  private _chartsStorageUrl: ChartingLibraryWidgetOptions['charts_storage_url'] = 'https://saveload.tradingview.com';
  private _chartsStorageApiVersion: ChartingLibraryWidgetOptions['charts_storage_api_version'] = '1.1';
  private _clientId: ChartingLibraryWidgetOptions['client_id'] = 'tradingview.com';
  private _userId: ChartingLibraryWidgetOptions['user_id'] = 'public_user_id';
  private _fullscreen: ChartingLibraryWidgetOptions['fullscreen'] = false;
  private _autosize: ChartingLibraryWidgetOptions['autosize'] = true;
  private _containerId: ChartingLibraryWidgetOptions['container_id'] = 'tv_chart_container';

  @Input()
  set symbol(symbol: ChartingLibraryWidgetOptions['symbol']) {
      this._symbol = symbol || this._symbol;
  }

  @Input()
  set interval(interval: ChartingLibraryWidgetOptions['interval']) {
      this._interval = interval || this._interval;
  }

  @Input()
  set datafeedUrl(datafeedUrl: string) {
      this._datafeedUrl = datafeedUrl || this._datafeedUrl;
  }

  @Input()
  set libraryPath(libraryPath: ChartingLibraryWidgetOptions['library_path']) {
      this._libraryPath = libraryPath || this._libraryPath;
  }

  @Input()
  set chartsStorageUrl(chartsStorageUrl: ChartingLibraryWidgetOptions['charts_storage_url']) {
      this._chartsStorageUrl = chartsStorageUrl || this._chartsStorageUrl;
  }

  @Input()
  set chartsStorageApiVersion(chartsStorageApiVersion: ChartingLibraryWidgetOptions['charts_storage_api_version']) {
      this._chartsStorageApiVersion = chartsStorageApiVersion || this._chartsStorageApiVersion;
  }

  @Input()
  set clientId(clientId: ChartingLibraryWidgetOptions['client_id']) {
      this._clientId = clientId || this._clientId;
  }

  @Input()
  set userId(userId: ChartingLibraryWidgetOptions['user_id']) {
      this._userId = userId || this._userId;
  }

  @Input()
  set fullscreen(fullscreen: ChartingLibraryWidgetOptions['fullscreen']) {
      this._fullscreen = fullscreen || this._fullscreen;
  }

  @Input()
  set autosize(autosize: ChartingLibraryWidgetOptions['autosize']) {
      this._autosize = autosize || this._autosize;
  }

  @Input()
  set containerId(containerId: ChartingLibraryWidgetOptions['container_id']) {
      this._containerId = containerId || this._containerId;
  }



  constructor(public ss: SharedService, public auth: AuthService, public app: AppService,private router:Router) {
    this.Cointype = localStorage.getItem('coinType');
    PageScrollConfig.defaultDuration = 500;
  }
  DataFeedConst(url, sym){
    const ur = url + '/symbols?symbol=ETH_' + sym;
    this.app.callUrl(ur).subscribe(res => {
      console.log(res);
    });
    // this.app.callhistory(url + '').subscribe(res=>{
    // }
  }

  ngOnInit() {
    this.chartType = 1; // initialise chart type
    this.getNotice();
    this.user = localStorage.getItem('DUserId');
    this.coinId = localStorage.getItem('coinId');
    this.address = localStorage.getItem('address');
    this.coin = '1';
    this.selectedCoin = localStorage.getItem('coinName');
    this.coinType = localStorage.getItem('coinType');
    this.getAllCoins();
    this.loggedIn();
    // this.LastPrice();

    this.getmarketCap();
    this.getUserBalance();
    if (this.chartType == 1) {
      //this.tradingView(this.selectedCoin, this.Cointype);
      this.chatSocket = new WebSocket(socket_url + localStorage.getItem('coinId') + '/');
      this.chatSocket.onopen = function (event) {
        // this.chatSocket.send({ 'data': 'ok' })
      };
      const that = this;
      this.chatSocket.onmessage = function (response) {
        const data = JSON.parse(response.data);
      that.markettrades = data.market_trade;
      };
    }
    this.icon = 'far';

    const widgetOptions: ChartingLibraryWidgetOptions = {
        symbol: this._symbol,
        datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(this._datafeedUrl),
        interval: this._interval,
        container_id: this._containerId,
        library_path: this._libraryPath,
        locale: 'en',
        disabled_features: ['use_localstorage_for_settings'],
        enabled_features: ['study_templates'],
        charts_storage_url: this._chartsStorageUrl,
        charts_storage_api_version: this._chartsStorageApiVersion,
        client_id: this._clientId,
        user_id: this._userId,
        fullscreen: this._fullscreen,
        autosize: this._autosize,
    };
    const tvWidget = new widget(widgetOptions);
  }

  getNotice() {
    this.app.getNotice().subscribe((res: any) => {
      this.chartType = res.notice[0].charttype;
      this.message=res.notice[0].message;
      console.log(this.message);
    });
  }

  getmarketCap() {
    this.app.getmarketCap(this.coinId).subscribe((res: any) => {
      this.tokenPrice = res;
    }
    );
  }
  getUserBalance() {
    if (this.loggedIn()) {
      this.loadBalance = true;
      this.app.getUserBalance(this.user).subscribe(
        (res: any) => {
          this.loadBalance = false;
          this.allBalances = res['user_balance'];
          if (this.allBalances.length == 0) {
            this.zeroBalAvail = true;
          }
        }, err => {
          this.loadBalance = false;
        }
      );
    } else {
      this.allBalances = [];
    }
  }



  getAllCoins() {
    this.loadercoin = true;
    this.ss.getAllCoin().subscribe((res: any) => {
      this.loadercoin = false;
      this.allCoins = res.coin;
      this.postQuery(this.allCoins[0].id);
      this.selectedCoinData = this.allCoins[0];
      localStorage.setItem('coinId', this.allCoins[0].id);
      localStorage.setItem('coinName', this.allCoins[0].short);
      localStorage.setItem('coinType', 'eth');
      this.selectedCoinLatestPrice = this.allCoins[0].last_price;
      this.router.navigate(['/dashboard',localStorage.getItem('coinName'), localStorage.getItem('coinType')]);
      this.getSelectedCoinDetails(this.allCoins[0].id);
      for (const co of this.allCoins) {
        if (co.for_eth = true) {
          this.eth.push(co);
          this.ethCopy.push(co);
        }
        if (co.for_tm = true) {
          this.tm.push(co);
          this.tmCopy.push(co);
        }
      }
    }, (error: any) => {
      this.allCoins=[];
      this.loadercoin = false;
    });
  }




  postQuery(id) {
    console.log(id);
    this.askData = [];
    this.bidData= [];
    if (this.loggedIn()) {
      this.loaderask = true;
      this.ss.postQuery(this.user, id).subscribe((res: any) => {
        this.loaderask = false;
        this.data = res;
        this.askData = res.sell_order;
        this.bidData = res.buy_order;
      }, (error: any) => {
        this.loaderask = false;
        this.askData = [];
        this.bidData = [];
      });
    } else {
      this.askData = [];
      this.bidData = [];
    }

  }

 
  // LastPrice() {
  // this.app.getLastPrice().subscribe(res => {
  //   this.lastPrice = res;
  // });
  // }

  /*  this.DataFeedConst.prototype.getBars = () => {
      console.log( ' i am getting bars');
    };
    // this.DataFeedConst.getBars();
    this.getChartContent(coin, type);
  }*/

  getChartContent(coin, type){
    console.log('getting chart content')
    const userInput = '';
    const exchange = '';
    // const symbolType = '';
    const onResultReadyCallback = '';
    const sym = 'ETH_' + coin;
    //  new TradingView.searchsymbol(userInput, exchange, symbolType, onResultReadyCallback){  }
    TradingView.resolveSymbol = (s, succes, err) => {
      s = sym;
      console.log('i am called with symbol ', sym);
    };
    TradingView.resolveSymbol(sym);
//  const onSymbolResolvedCallback = () {
//   console.log(' i am called for symbol resolve');
// };

  }
  // triggerConv() {
  //   this.buyCoin();
  // }

  loggedIn() {
    this.isLoggedIn = this.auth.isLoggedIn();
    return this.isLoggedIn ? true : false;
  }

  addFavEth(favData, id) {
    const fav = localStorage.getItem('favEth');
    const favArr = localStorage.getItem('favEthArray');
    if (fav) {
      const storeFav = JSON.parse(fav);
      storeFav[id] = id;
      this.onlyfavEthArr = JSON.parse(favArr);
      this.onlyfavEthArr.push(favData);
      localStorage.setItem('favEth', JSON.stringify(storeFav));
      localStorage.setItem('favEthArray', JSON.stringify(this.onlyfavEthArr));
    } else {
      this.onlyFavEth[id] = id;
      this.onlyfavEthArr.push(favData);
      localStorage.setItem('favEth', JSON.stringify(this.onlyFavEth))
      localStorage.setItem('favEthArray', JSON.stringify(this.onlyfavEthArr));
    }

  }

  addFavTm(favData, id) {
    const fav = localStorage.getItem('favTm');
    const favArr = localStorage.getItem('favTmArray');
    if (fav) {
      const storeFav = JSON.parse(fav);
      storeFav[id] = id;
      this.onlyfavTmArr = JSON.parse(favArr);
      this.onlyfavTmArr.push(favData);
      localStorage.setItem('favTm', JSON.stringify(storeFav))
      localStorage.setItem('favTmArray', JSON.stringify(this.onlyfavTmArr))
    } else {
      this.onlyFavTm[id] = id;
      this.onlyfavTmArr.push(favData);
      localStorage.setItem('favTm', JSON.stringify(this.onlyFavTm))
      localStorage.setItem('favTmArray', JSON.stringify(this.onlyfavTmArr))
    }
  }

  FavouriteOnlyEth(e) {
    const fav = localStorage.getItem('favEthArray')
    if (e && fav) {
      this.eth = JSON.parse(fav);
    } else if (e && !fav) {
      this.eth = [];
    } else {
      this.eth = this.ethCopy;
    }
  }


  FavouriteOnlyTm(e) {
    const fav = localStorage.getItem('favTmArray')
    if (e && fav) {
      this.tm = JSON.parse(fav);
    } else if (e && !fav) {
      this.tm = [];
    } else {
      this.tm = this.tmCopy;
    }
  }

  checkIfFavTm(id) {

    let fav = localStorage.getItem('favTm');
    if (fav) {
      fav = JSON.parse(fav);
      if (fav[id] == id) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  checkIfFavEth(id) {
    let fav = localStorage.getItem('favEth');
    if (fav) {
      fav = JSON.parse(fav);
      if (fav[id] == id) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }
  // localStorage.getItem()


  removeFavEth(favData, id) {
    const fav = JSON.parse(localStorage.getItem('favEth'));
    const favArr = JSON.parse(localStorage.getItem('favEthArray'));
    favArr.forEach(function (element, i) {
      if (element.id == id) {
        favArr.splice(i, 1);
        return null;
      }
    }, this);
    delete fav[id];
    localStorage.setItem('favEth', JSON.stringify(fav));
    localStorage.setItem('favEthArray', JSON.stringify(favArr));
  }


  removeFavTm(favData, id) {
    const fav = JSON.parse(localStorage.getItem('favTm'));
    const favArr = JSON.parse(localStorage.getItem('favTmArray'));
    favArr.forEach(function (element, i) {
      if (element.id == id) {
        favArr.splice(i, 1);
        return null;
      }
    }, this);
    delete fav[id];
    localStorage.setItem('favTm', JSON.stringify(fav));
    localStorage.setItem('favTmArray', JSON.stringify(favArr));
  }


  setCoin(coin, type) {
    this.chatSocket.close();
    this.selectedCoinData = coin;
    this.getSelectedCoinDetails(coin.id);
    this.postQuery(coin.id);
    // this.LastPrice();
    localStorage.setItem('coinId', coin.id);
    localStorage.setItem('coinType', type);
    localStorage.setItem('coinName', coin.short);
    localStorage.setItem('coinLatestPrice', coin.price == undefined ? '0' : coin.last_price);
    this.selectedCoinLatestPrice = coin.last_price;
    this.SelectCoin(coin.short);
    this.chatSocket = new WebSocket(socket_url + localStorage.getItem('coinId') + '/');
    this.chatSocket.onopen = function (event) {
      // this.chatSocket.send({ 'data': 'ok' })
    };
    const that = this;
    this.chatSocket.onmessage = function (response) {
      const data = JSON.parse(response.data);
      that.markettrades = data.market_trade;
    };
  }

  getSelectedCoinDetails(coinId) {
    this.selectedCoinDetails = '';
    this.app.getSelectedCoinDetails(coinId).subscribe((res: any) => {
      this.selectedCoinDetails = res;
    });
  }

  SelectCoin(Coin: any) {
    Swal(
      ' Coin Selected', Coin,
      'success'
    );
    this.selectedCoin = localStorage.getItem('coinName');
    this.Cointype = localStorage.getItem('coinType');
    this.router.navigate(['/dashboard',this.selectedCoin,  this.Cointype]);
    if (this.chartType == 1) {
      // this.tradingView(this.selectedCoin, this.Cointype);
      const widgetOptions: ChartingLibraryWidgetOptions = {
        symbol: 'ETH_' + Coin,
        datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(this._datafeedUrl),
        interval: this._interval,
        container_id: this._containerId,
        library_path: this._libraryPath,
        locale: 'en',
        disabled_features: ['use_localstorage_for_settings'],
        enabled_features: ['study_templates'],
        charts_storage_url: this._chartsStorageUrl,
        charts_storage_api_version: this._chartsStorageApiVersion,
        client_id: this._clientId,
        user_id: this._userId,
        fullscreen: this._fullscreen,
        autosize: this._autosize,
    };
    const tvWidget = new widget(widgetOptions);
    }
  }

  toggleCollapsed() {
    if (this.sidenav.nativeElement) {
      this.sidenav.nativeElement.classList.toggle('collapsed');
    }
  }
  itemClicked(event) {
    const element = $('.list-group-item');
    element.removeClass('activeLi');
    event.target.classList.add('activeLi');
    this.sidenav.nativeElement.classList.remove('collapsed');
  }


}
