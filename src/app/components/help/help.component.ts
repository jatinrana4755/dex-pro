import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  template: `<app-nav-logged-in></app-nav-logged-in><router-outlet></router-outlet><app-footer></app-footer>`,
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
