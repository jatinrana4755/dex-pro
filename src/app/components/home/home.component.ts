import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../providers/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
}) export class HomeComponent implements OnInit {
    isLoggedIn: any;
    constructor(private auth: AuthService) {
    }

    ngOnInit() {
        this.isLoggedIn = this.auth.isLoggedIn();
    }

}
