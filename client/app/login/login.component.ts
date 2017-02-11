import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { UserLogin } from "../services/user/user-login";
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  editingUser: UserLogin;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.editingUser = new UserLogin();
  }

  onLogin(user: UserLogin) {
    this.userService.login(user)
      .then(user => {
        console.log(user);
        this.router.navigateByUrl('');
      })
      .catch(error => {
        console.log(error);
      });
  }

  onForgotPassword() {
    
  }

}
