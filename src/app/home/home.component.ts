import { Component, OnInit } from '@angular/core';
import {UserService} from '../_services/user.service';
import {AuthService} from '../_services/auth.service';
import {TokenStorageService} from '../_services/token-storage.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage: string;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }
}
