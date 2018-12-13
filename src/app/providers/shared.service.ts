import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable()
export class SharedService {
  baseUrl = this.auth.baseUrl;
  constructor(private http: Http, private auth: AuthService) { }

  getAllCoin() {
    return this.http.get(`${this.baseUrl}Coin/`).pipe(
      map(res => res.json())
    );
  }

  postQuery(user, coin) {
    const data = new FormData();
    data.append('user', user);
    data.append('coin', coin);
    //  const header = new Headers();
    //  header.append('Content-Type', 'application/x-www-form-urlencoded');
    //  const opt = new RequestOptions({'headers': header});
    // //  const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    return this.http.post(`${this.baseUrl}Query/`, data).pipe(
      map(res => res.json())
    );
  }

  Query(formdata) {
    return this.http.post(`http://104.237.156.106:8000/exchange/Query/`, formdata).pipe(
      map(res => res.json())
    );
  }

  postTokenVerify(data) {
    const form_data = new FormData();
    form_data.append('user', data);
    return this.http.post(`http://104.237.156.106:8000/exchange/TokenVerify/`, form_data).pipe(
      map(res => res.json())
    );
  }


}
