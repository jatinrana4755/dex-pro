
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
@Injectable()
export class AdminDataService {
  baseUrl = ' http://104.237.156.106:8000/'
  constructor(private http: Http, private auth: AuthService) { }
  AddCoin(coinData) {

    return this.http.post(`${this.baseUrl}adminapi/addcoin/`, coinData).pipe(
      map(res => res.json())
    );
  }
  public editCoin(CoinId, currentCoin): any {
    return this.http.put(`${this.baseUrl}adminapi/coin/` + CoinId + '/', currentCoin).pipe(
      map(res => res.json())
    );
  }
  public getSingleCoinInformation(id): any {
    return this.http.get(`${this.baseUrl}adminapi/coin/` + id + '/').pipe(
      map(res => res.json())
    );
  }


  public deleteCoin(CoinId): any {
    return this.http.delete(`${this.baseUrl}adminapi/coin/` + CoinId + '/').pipe(
      map(res => res.json())
    );
  }


  getCoins() {
    return this.http.get(`http://104.237.156.106:8000/adminapi/coin_list/`).pipe(map(
      (response: Response) => {
        return response.json();
      }
    ));
  }

  showMessage(classany, ico) {
    const alertBox = document.getElementById('alert-message');
    const icon = document.getElementById('icon-alert');
    if (icon) {
      icon.classList.add(ico);
    }
    if (alertBox) {
      alertBox.classList.add(classany);
    }
    alertBox.style.display = 'block';
    setTimeout(() => {
      alertBox.style.display = 'none';
    }, 4000);
  }

  postFee(formData, type) {
    if(type == 'maker_fee'){
    return this.http.post(`${this.baseUrl}adminapi/makerfee/`, formData).pipe(
      map(res => res.json())
    );
    } else if(type == 'taker_fee'){
      return this.http.post(`${this.baseUrl}adminapi/takerfee/`, formData).pipe(
      map(res => res.json())
    );
    } else if ( type == 'withdraw_fee'){
      return this.http.post(`${this.baseUrl}adminapi/withdrawlfee/`, formData).pipe(
      map(res => res.json())
    );
    }
  }

  getNotice() {
    return this.http.get(`${this.baseUrl}exchange/Notice/`).pipe(map(
      (response: Response) => {
        return response.json();
      }
    ));
  }
  addNotice(chart, message) {
    const formdata = new FormData();
    formdata.append('chartype', chart);
    formdata.append('notice', message);
    return this.http.post(`${this.baseUrl}adminapi/notice/`, formdata);
  }

  getFee() {
    return this.http.get(`${this.baseUrl}exchange/Fee/`).pipe(map(
      (response: Response) => {
        return response.json();
      }
    ));
  }
}

