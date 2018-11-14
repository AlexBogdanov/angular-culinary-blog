import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { ToastrService } from './toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:4000';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastrService: ToastrService
    ) { }

  tryRegister(user) {
    return this.http.post<any>(`${this.url}/register`, user);
  }

  tryLogin(user) {
    return this.http.post<any>(`${this.url}/login`, user);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
    this.toastLogoutSuccess();
  }

  getToken() {
    return localStorage.getItem('token');
  }

  toastLogoutSuccess() {
    this.toastrService.Success('Logout successfull');
  }
}
