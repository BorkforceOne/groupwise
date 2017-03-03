import { Injectable } from '@angular/core';
import {CanActivate, Router, CanActivateChild} from '@angular/router';
import {AuthService} from "../services/user/auth.service";
import {Observable} from "rxjs";

@Injectable()
export class NotLoggedinGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.getLoggedInUserOnce()
      .map((user) => {
        if (user == null)
          return true;
        else {
          this.router.navigateByUrl('/login');
          return false;
        }
      });
  }

  canActivateChild() {
    return this.canActivate();
  }
}
