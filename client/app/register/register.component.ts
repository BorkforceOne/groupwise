import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user/user.service';
import {UserRegister} from "../services/user/user-register";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  editingUser: UserRegister;
  registrationComplete: Boolean;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.editingUser = new UserRegister();
    this.registrationComplete = false;
  }

  onRegister(user: UserRegister) {
    this.userService.create(user)
      .then(user => {
        console.log(user);
        this.registrationComplete = true;
      })
      .catch(error => {
        console.log(error);
      });
  }

}
