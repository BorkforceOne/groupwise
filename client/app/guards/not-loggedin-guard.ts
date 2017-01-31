import { Injectable } from '@angular/core';
import {CanActivate, Router, CanActivateChild} from '@angular/router';
import {UserService} from "../services/user/user.service";

@Injectable()
export class NotLoggedinGuard implements CanActivate, CanActivateChild {
  constructor(private userService: UserService, private router: Router) {}

  canActivate() {
    if (!this.userService.isLoggedIn())
      return true;
    this.router.navigateByUrl('/home');
    return false;
  }

  canActivateChild() {
    return this.canActivate();
  }
}
