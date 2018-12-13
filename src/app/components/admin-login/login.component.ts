import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../providers/auth.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: any;
  password: any;
  loader: boolean = false;
  loginform: any;
  constructor(public as: AuthService, private router: Router, public fb: FormBuilder) { }

  ngOnInit() {
    this.loginform = this.loginForm();
  }

  loginForm() {
    return this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    this.loader = true;
    const formData = new FormData();
    formData.append('username', this.loginform.get('username').value);
    formData.append('password', this.loginform.get('password').value);
    this.as.adminlogin(formData).subscribe((res: any) => {
      this.loader = false;
      console.log('logged in')
      localStorage.setItem('admin','true');
      this.router.navigate(['/admin/coin']);
    }, err => {
      this.loader = false;
      if (err.status === 401) {
        Swal(
          '',
          'Unauthorized User',
          'warning'
        );
      } else {
        Swal(
          '',
          'error',
          'warning'
        );
      }
    });
    this.loginform.reset();
  }

}

