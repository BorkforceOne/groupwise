import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import {UserRegister} from "../../services/user/user-register";
import {Router} from "@angular/router";
import {AlertService} from "../../services/alert/alert.service";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-register-general-information',
  templateUrl: 'register-general-information.component.html',
  styleUrls: ['register-general-information.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class RegisterGeneralInformationComponent implements OnInit {

  editingUser: UserRegister;
  registrationComplete: Boolean;

  constructor(private userService: UserService, private alertService: AlertService, private router: Router) { }

  ngOnInit() {
    this.editingUser = new UserRegister();
    this.registrationComplete = false;
  }

}
