import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../services/auth.service';
import { ToastrService } from './../../services/toastr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./../register/register.component.css']
})
export class LoginComponent {

  checkBox = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
    ) { }

  loginUser(email, password) {
    const user = {
      email,
      password
    };
    this.authService.tryLogin(user)
    .subscribe(
      res => {
        if (this.checkBox) {
          localStorage.setItem('token', res.token);
        } else {
          sessionStorage.setItem('token', res.token);
        }
        this.router.navigate(['/home']);
        this.toastLoginSuccess();
      },
      err => {
        console.log(err);
        this.toastLoginError();
      }
    );
  }

  changeCheckBox() {
    if (this.checkBox) {
      this.checkBox = false;
    } else {
      this.checkBox = true;
    }
  }

  toastLoginSuccess() {
    this.toastrService.Success('Login successfull');
  }

  toastLoginError() {
    this.toastrService.Error('Incorrect email or password');
  }
}
