import { Injectable } from '@angular/core';
import {CanActivate, Router, CanActivateChild} from '@angular/router';
import {Observable} from "rxjs";
import {AuthService} from "../services/user/auth.service";

@Injectable()
export class HostGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.getLoggedInUserOnce()
      .map((user) => {
        if (user != null && user.Type == 'HOST')
          return true;
        this.router.navigateByUrl('/');
        return false;
      });
  }

  canActivateChild() {
    return this.canActivate();
  }
}
