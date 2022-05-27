import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return ''
  }
  inValidLogin: boolean = false;
  // email: string = '';
  // password: string = '';
  constructor(private router: Router, private service: AuthService) {}

  ngOnInit(): void {}

  public signIn() {
    this.service.login({email: this.email.value, password: this.password.value})
    .subscribe(() => {
      if (this.service.status == 200) {
        localStorage.setItem(
          'token',
          JSON.stringify(this.service.getLoginUser.token)
        );
      this.service.getLoginUser.role == "admin" ? this.router.navigate(['/admin/dashboard']) :  this.router.navigate(['/dashboard']);
      }
      else this.inValidLogin = true;
    });
  }
}
