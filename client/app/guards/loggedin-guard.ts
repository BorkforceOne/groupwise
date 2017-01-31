import { Injectable } from '@angular/core';
import {CanActivate, Router, CanActivateChild} from '@angular/router';
import {UserService} from "../services/user/user.service";

@Injectable()
export class LoggedinGuard implements CanActivate, CanActivateChild {
  constructor(private userService: UserService, private router: Router) {}

  canActivate() {
    if (this.userService.isLoggedIn())
      return true;
    this.router.navigateByUrl('/login');
    return false;
  }

  canActivateChild() {
    return this.canActivate();
  }
}
