import { Component, OnInit, OnDestroy , DoCheck , AfterViewInit} from '@angular/core';
// import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-twitter',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.css']
})
export class TwitterComponent implements OnInit{
twitter: any;
  constructor(
    // private _router: Router
  ) {
    // this.initTwitterWidget();
   }
ngOnInit() {
  // this.initTwitterWidget();
   (<any>window).twttr.widgets.load();
}

  // initTwitterWidget() {
  //   this._router.events.subscribe(val => {
  //     if (val instanceof NavigationEnd) {
  //       (<any>window).twttr = (function (d, s, id) {
  //         let js: any;
  //          const fjs = d.getElementsByTagName(s)[0],
  //             t = (<any>window).twttr || {};
  //         if (d.getElementById(id)) {return t; }
  //         js = d.createElement(s);
  //         js.id = id;
  //         js.src = 'https://platform.twitter.com/widgets.js';
  //         fjs.parentNode.insertBefore(js, fjs);

  //         t._e = [];
  //         t.ready = function (f: any) {
  //             t._e.push(f);
  //         };

  //         return t;
  //       }(document, 'script', 'twitter-wjs'));

  //       if ((<any>window).twttr.ready()) { (<any>window).twttr.widgets.load(); }

  //     }
  //   });
  // }

  // ngOnDestroy() {
  //   this.twitter.unsubscribe();
  // }
}
