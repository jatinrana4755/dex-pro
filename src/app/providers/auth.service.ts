import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
@Injectable()
export class AuthService {
    baseUrl = 'http://104.237.156.106:8000/exchange/';
    constructor(private http: Http) { }

    login(pk) {
        const formdata = new FormData();
        formdata.append('pk', pk);
        return this.http.post(`${this.baseUrl}GetAcDetail/`, formdata).pipe(
            map(res => res.json())
        );
    }

    adminlogin(formData){
        return this.http.post(`http://104.237.156.106:8000/adminapi/Login/`, formData);
      }

    isadminLoggedIn() {
        const admin = localStorage.getItem('admin');
        if (admin) {
            return true;
        } else {
            return false;
        }
    }

    isLoggedIn() {
        const id = localStorage.getItem('DUserId');
        if (id) {
            return true;
        } else {
            return false;
        }
    }
}
