import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    private router: Router,
    private authService: AuthService
    ) { }

  getUrl() {
    return 'url("http://2getcooking.com/img/logo.png")';
  }
}
