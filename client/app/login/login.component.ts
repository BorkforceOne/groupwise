import {Component, OnInit, ViewChild} from '@angular/core';
import { UserService } from '../services/user/user.service';
import { UserLogin } from "../services/user/user-login";
import { Router } from '@angular/router'
import {ModalDirective} from "ng2-bootstrap";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";

interface UserPasswordReset {
  Email: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('staticModal') public staticModal:ModalDirective;

  loginForm: FormGroup;
  resetPasswordForm: FormGroup;

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      Email: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
      Password: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
    });

    this.resetPasswordForm = this.formBuilder.group({
      Email: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
    });
  }

  onLogin(user: UserLogin, valid: boolean) {
    this.userService.login(user)
      .then(() => {
        this.router.navigateByUrl('');
      });
  }

  onForgotPassword(userReset: UserPasswordReset, valid: boolean) {
    this.userService.resetPassword(userReset.Email)
      .then(() => {
        this.staticModal.hide();
      })
      .catch(() => {
        this.staticModal.hide();
      });
  }

}
