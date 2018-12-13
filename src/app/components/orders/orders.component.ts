import { Component } from '@angular/core';

@Component({
    selector: 'orders',
    template: `<app-nav-logged-in></app-nav-logged-in><router-outlet></router-outlet><app-footer></app-footer>`,
})
export class OrdersComponent{
}