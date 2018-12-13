import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
@Injectable()
export class AppService {
    baseUrl = this.auth.baseUrl;

    constructor(private http: Http, private auth: AuthService) { }

    createWallet(data) {
        const formData = new FormData();
        formData.append('password', data);
        return this.http.post(`${this.baseUrl}signup/`, formData).pipe(
            map(res => res.json())
        );
    }
    getLastPrice() {
        return this.http.get(`${this.baseUrl}Lastprice/`).pipe(map(
            (response: Response) => {
                return response.json();
            }
        ));

    }
    changeWallet(data) {
        return this.http.post(`${this.baseUrl}GetPk/`, data).pipe(
            map(res => res.json())
        );
    }

    buyCoin(data) {
        return this.http.post(`${this.baseUrl}Buy/`, data).pipe(
            map(res => res.json())
        );
    }

    saleCoin(data) {
        return this.http.post(`${this.baseUrl}Sale/`, data).pipe(
            map(res => res.json())
        );
    }

    UnlockMask(data) {
        return this.http.post(`${this.baseUrl}unlock_via_metamask/`, data).pipe(
            map(res => res.json())
        );
    }


    getSelectedCoinDetails(coinId) {
        const formData = new FormData();
        formData.append('coin', coinId);
        return this.http.post(`${this.baseUrl}GetDet/`, formData).pipe(
            map(res => res.json())
        );
    }

    getMarketTrade(data){
        return this.http.post(`${this.baseUrl}CoinTransacton/`, data).pipe(
            map(res => res.json())
        );
    }

    getMyTrade(data){
        return this.http.post(`${this.baseUrl}UserTransacton/`, data).pipe(
            map(res => res.json())
        );
    }
    getmarketCap(coinId){
        const formData = new FormData();
        formData.append('coin', coinId);
        return this.http.post(`${this.baseUrl}TokenPrice/`, formData).pipe(
            map(res => res.json())
        );
    }
    getUserBalance(userId){
        const formData = new FormData();
        formData.append('user', userId);
        return this.http.post(`${this.baseUrl}UserCoin/`, formData).pipe(
            map(res => res.json())
        );

    }

    setUserName(id, username){
        const formData = new FormData();
        formData.append('username', username);
        formData.append('user', id);
        return this.http.post(`${this.baseUrl}Username/`, formData).pipe(
            map(res => res.json())
        );
    }

    getUserName(id){
         return this.http.get(`${this.baseUrl}Username/?user=${id}`).pipe(
            map(res => res.json())
        );
    }

    getNotice(){
        return this.http.get(`${this.baseUrl}Notice/`).pipe(
            map(res => res.json())
        );
    }

    getFee(){
        return this.http.get(`${this.baseUrl}Fee/`).pipe(
            map(res => res.json())
        );
    }

    callUrl(url){
        return this.http.get(url).pipe(
            map(res => res.json())
        );
    }

    callhistory(url){
        return this.http.get(url).pipe(
            map(res => res.json())
        );
    }

}
