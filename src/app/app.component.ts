import { Component, OnInit } from '@angular/core';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd, NavigationCancel, NavigationError } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NgProgress } from 'ngx-progressbar';

@Component({
  selector: 'app-root',
  template: `
  <ng-progress  [minimum]="0.25" [maximum]="1"
             [speed]="200" [showSpinner]="true" [direction]="'leftToRightIncreased'"
             [color]="'#278fff'" [trickleSpeed]="250" [thick]="true" [ease]="'linear'"
></ng-progress>
  <router-outlet></router-outlet>`
   ,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private router: Router,
    private ngProgress: NgProgress
){
    localStorage.removeItem('firebase:previous_websocket_failure');
  }
  title = 'app';
  ngOnInit(){
   this.router.events.pipe(
      filter(ev => ev instanceof RouteConfigLoadStart || ev instanceof RouteConfigLoadEnd)     
   )
      .subscribe((event) => {
        if (event instanceof RouteConfigLoadStart) {
          console.log('started')
          this.ngProgress.start();
        } else {
          console.log('ended')
          this.ngProgress.done();
        }
      });
  }
}
