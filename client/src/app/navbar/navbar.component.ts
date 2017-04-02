import { Component, OnInit } from '@angular/core';
import { Routes, Route, Router } from '@angular/router';
import { UserService } from "../services/user/user.service";
import {User} from "../services/user/user";
import {Observable} from "rxjs";
import {AuthService} from "../services/user/auth.service";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private isCollapsed: boolean = true;
  private loggedInUser: Observable<User>;
  private isLoggedIn: boolean;
  private type: "ADMINISTRATOR" | "HOST" | "STUDENT";
  private displayName: string;
  private userId: number;
  constructor(private userService: UserService, private router: Router, private authService: AuthService) { }
  ngOnInit() {
    this.loggedInUser = this.authService.getLoggedInUser();
    this.loggedInUser.subscribe((user) => {
      if (user != null) {
        this.isLoggedIn = true;
        this.type = user.Type;
        this.displayName = this.userService.getUserDisplayName(user);
        this.userId = user.Id;
      }
      else {
        this.isLoggedIn = false;
        this.type = null;
        this.displayName = "";
        this.userId = null;
      }
    });
  }
  isActiveRoute(route: string) {
    return this.router.url == route;
  }
  logout() {
    this.authService.logout()
      .toPromise()
      .then(() => {
        this.router.navigate(['']);
      })
  }
}
