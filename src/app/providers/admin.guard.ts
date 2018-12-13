import { CanActivate, Router, CanDeactivate } from '@angular/router';
import { Injector, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import swal from 'sweetalert2';
@Injectable()
export class AdminGuard implements CanActivate{

  constructor(private router: Router,
              private authService: AuthService) { }

  canActivate() {
    // Imaginary method that is supposed to validate an auth token
    // and return a boolean
    if (this.authService.isadminLoggedIn()) {
      return true;
    } else {
      this.router.navigateByUrl('/adminlogin');
      swal('Please Login First');
      return false;
    }
  }


}

