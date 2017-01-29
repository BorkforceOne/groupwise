import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserService} from "../services/user/user.service";

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate() {
    if (this.userService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
