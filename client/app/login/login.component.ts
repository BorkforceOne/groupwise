import {Component, OnInit, ViewChild} from '@angular/core';
import { UserService } from '../services/user/user.service';
import { UserLogin } from "../services/user/user-login";
import { Router } from '@angular/router'
import {ModalDirective} from "ng2-bootstrap";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('staticModal') public staticModal:ModalDirective;

  editingUser: UserLogin = new UserLogin();
  passwordResetEmail: string = "";

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.editingUser = new UserLogin();
  }

  onLogin() {
    this.userService.login(this.editingUser)
      .then(() => {
        this.router.navigateByUrl('');
      });
  }

  onForgotPassword() {
    this.userService.resetPassword(this.passwordResetEmail)
      .then(() => {
        this.staticModal.hide();
      })
      .catch(() => {
        this.staticModal.hide();
      });
  }

}
