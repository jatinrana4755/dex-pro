import { Component} from '@angular/core';

@Component({
    selector: 'app-balance',
    template: `<app-nav-logged-in></app-nav-logged-in><router-outlet></router-outlet><app-footer></app-footer>`,
    styleUrls: ['./balance.component.scss']
}) export class BalanceComponent {

    constructor() {
    }

}
