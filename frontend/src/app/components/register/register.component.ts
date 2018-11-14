import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../services/auth.service';
import { ToastrService } from './../../services/toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
    ) { }

  registerUser(email, password) {
    const user = {
      email,
      password
    };
    this.authService.tryRegister(user)
    .subscribe(
      res => {
        console.log(res);
        sessionStorage.setItem('token', res.token);
        this.toastRegisterSuccess();
        this.router.navigate(['/articles/create']);
      },
      err => {
        console.log(err);
        this.toastRegisterError(err);
      });
  }

  toastRegisterSuccess() {
    this.toastrService.Success('Register successfull');
  }

  toastRegisterError(message) {
    this.toastrService.Error('Email is already taken');
  }
}
