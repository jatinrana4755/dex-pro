import { Component, OnInit } from '@angular/core';
import { switchAll } from '../../../../node_modules/rxjs/operators';
import Swal from 'sweetalert2';
import { SharedService } from '../../providers/shared.service';
import { RouterModule, Router } from '@angular/router';
import {NgStyle} from '@angular/common';



@Component({
  selector: 'app-nav-logged-in',
  templateUrl: './nav-logged-in.component.html',
  styleUrls: ['./nav-logged-in.component.scss'],

})
export class NavLoggedInComponent implements OnInit {
  address: any;
  userId: any;
  constructor(private router: Router, private shared: SharedService) {
   }

  ngOnInit() {
    this.address = localStorage.getItem('address');
    this.userId = localStorage.getItem('DUserId');
    
    this.tokenVerify();
    
  }
  function2() {
    this.router.navigate(['/change-wallet']);
  }

  tokenVerify() {
    this.shared.postTokenVerify(this.userId)
      .subscribe(res => {
      });
    setTimeout(() => {
      this.tokenVerify();
    }, 5000);
  }

  logout() {
    Swal({
      title: "Are you sure?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, I am sure!',
      cancelButtonText: "No, cancel it!"
   }).then((value) => {
     console.log(value.value)
           if(value.value == true) { 
            localStorage.clear();
            this.router.navigate(['home']);
            Swal(
              'Log Out!',
              'Your are Successfully LogOut.',
              'success'
            );
        }
      })
    
  }
    onLoad():
      void {
       
        window.open ( 'https://etherscan.io/address/' + this.address,'_blank');
  }
  copyPrivateKey() {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(document.getElementById('privatekey'));
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('Copy');
    Swal('Address Copied',
    ' ',
    'info');
    
}
}
