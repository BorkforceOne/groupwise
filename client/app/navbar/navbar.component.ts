import { Component, OnInit } from '@angular/core';
import { Routes, Route, Router } from '@angular/router';
import { UserService } from "../services/user/user.service";
import {User} from "../services/user/user";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isCollapsed: boolean = true;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  isActiveRoute(route: string) {
    return this.router.url == route;
  }

  logout() {
    this.userService.logout()
      .then(() => {
        this.router.navigate(['']);
      })
  }

  isLoggedIn() {
    return this.userService.getLoggedInUser() !== null;
  }

  isAdmin() {
    return this.userService.isAdmin(this.getLoggedInUser());
  }

  getUserDisplayName() {
    return this.userService.getUserDisplayName(this.getLoggedInUser());
  }

  getLoggedInUser(): User{
    return this.userService.getLoggedInUser();
  }
}
