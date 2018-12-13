import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  collapsed: any;
  collapsedEvent: any;
  isActive: any;
  @ViewChild ('sidenavButton') sidenavButton: ElementRef;
  @ViewChild ('sidenav') sidenav: ElementRef;
  constructor(private router: Router) { }

  ngOnInit() {
  }
  toggleCollapsed() {
    if (this.sidenav.nativeElement) {
      this.sidenav.nativeElement.classList.toggle('collapsed');
    }
  }
  itemClicked() {
    if (this.sidenav.nativeElement) {
      this.sidenav.nativeElement.classList.remove('collapsed');
    }
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
         localStorage.removeItem('admin');
         this.router.navigate(['home']); 
         Swal(
          'Log Out!',
          'Your are Successfully LogOut.',
          'success'
        );
        }
      })
         
  }
}
