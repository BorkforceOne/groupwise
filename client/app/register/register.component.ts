import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user/user.service';
import {UserRegister} from "../services/user/user-register";
import {AlertService} from "../services/alert/alert.service";
import {Alert} from "../services/alert/alert";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  editingUser: UserRegister;
  registrationComplete: Boolean;

  constructor(private userService: UserService, private alertService: AlertService, private router: Router) { }

  ngOnInit() {
    this.editingUser = new UserRegister();
    this.registrationComplete = false;
  }

  onRegister(user: UserRegister) {
    this.userService.create(user)
      .then(user => {
        console.log(user);
        const alert = new Alert();
        alert.Text = "Please check your email to complete registration";
        alert.Type = "success";
        this.alertService.addAlert(alert);
        this.router.navigateByUrl('');
      })
      .catch(error => {
        console.log(error);
      });
  }

}
