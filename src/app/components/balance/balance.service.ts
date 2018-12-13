import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthService } from './../../providers/auth.service';
import { map } from 'rxjs/operators';
@Injectable()
export class BalanceService {
baseUrl = this.auth.baseUrl;

    constructor(private http: Http, private auth: AuthService) {}

    getWithdrawalHistory(user) {
        const data = new FormData();
        data.append('user', user);
        return this.http.post(`${this.auth.baseUrl}WithdrawlH/`, data).pipe(
            map(res => res.json())
        )
    }

    getDepositHistory(user) {
        const data = new FormData();
        data.append('user', user);
        return this.http.post(`${this.auth.baseUrl}DepositeH/`, data).pipe(
            map(res => res.json())
        )
    }

    getFullBalance(data, page) {
        const form_data = new FormData();
        form_data.append('user', data);
        return this.http.post(`${this.auth.baseUrl}UserCoinMain/?page=${page}`, form_data);
    }

    depositAmount(formdata){
        return this.http.post(`${this.auth.baseUrl}Deposite/`, formdata);
    }

     withdrawAmount(formdata){
        return this.http.post(`${this.auth.baseUrl}Withdrawl/`, formdata);
    }

    query(formdata){
        return this.http.post(`${this.auth.baseUrl}Query/`, formdata);
    }
}
