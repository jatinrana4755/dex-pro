import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
import { AuthService } from './../../providers/auth.service';
import { map } from 'rxjs/operators';

@Injectable()
export class OrdersService {
  baseUrl = this.auth.baseUrl;
  constructor(private http: Http, private auth: AuthService) { }

  getOpenOrders(coin, user) {
    const formData = new FormData();
    formData.append('coin', coin);
    formData.append('user', user);
    return this.http.post(`${this.baseUrl}My_open_order/`, formData).pipe(
      map(res => res.json())
    );
  }
  getRate(coin) {
    const headers = new HttpHeaders();
    // headers.set('Content-Type', 'application/x-www-form-urlencoded');
    // headers.set('Access-Control-Allow-Origin', '*');

    const response = this.http.post(`${this.baseUrl}CoinTransaction/`, coin);
    return response;

  }

  getMyTrade(coin, user) {
    const formData = new FormData();
    formData.append('coin', coin);
    formData.append('user', user);
    return this.http.post(`${this.baseUrl}UserTransacton/`, formData).pipe(
      map(res => res.json())
    );
  }
  deleteOrder(data){ 
    return this.http.post(`${this.baseUrl}DelOrder/`,data)
    
  }
}

