import { Component, OnInit } from '@angular/core';
import { Routes, Route, Router } from '@angular/router';
import { UserService } from "../services/user/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  isActiveRoute(route: string) {
    return this.router.url == route;
  }

  isLoggedIn() {
    return this.userService.getLoggedInUser() !== null;
  }
}
