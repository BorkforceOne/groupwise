import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user/user.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../services/user/user";
import {AuthService} from "../services/user/auth.service";
import {AlertService} from "../services/alert/alert.service";
import {Alert} from "../services/alert/alert";

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {
  private user: User;
  private userForm: FormGroup;
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  constructor(private userService: UserService, private formBuilder: FormBuilder, private authService: AuthService, private alertService: AlertService) {
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      Email: ['', [<any>Validators.required, <any>Validators.pattern(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/)]],
      Password: ['', [<any>Validators.minLength(4)]],
      PasswordVerify: ['', [<any>Validators.minLength(4)]],
      Firstname: ['', [<any>Validators.required]],
      Lastname: ['', [<any>Validators.required]],
      Phone: ['', [<any>Validators.required, <any>Validators.pattern(/\([1-9]\d{2}\) \d{3}\-\d{4}/)]],
      ReceiveGeneralNotifications: ['', [<any>Validators.required]],
      ReceiveNewMatchNotifications: ['', [<any>Validators.required]],
      ReceiveMessageNotifications: ['', [<any>Validators.required]],
      Age: ['', [<any>Validators.required, <any>this.oldEnough]]
    }, {validator: this.matchingPasswords('Password', 'PasswordVerify')});

    this.authService.getLoggedInUser()
      .subscribe((user) => {
        this.user = user;
        this.userForm.reset(this.user);
      });
  }

  private matchingPasswords(passwordKey: string, passwordConfirmKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey];
      let passwordConfirmationInput = group.controls[passwordConfirmKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true});
      }
    }
  }

  private oldEnough(birthdayInput: FormControl) {
    if (Number(birthdayInput.value) < 18)
      return {notOldEnough: true};
    return null;
  }

  updateUser(user: User) {
    return this.userService.updateUser(user)
      .subscribe((user) => {
        this.userForm.reset(user);
        let alert = new Alert();
        alert.Type = "success";
        alert.Text = "Successfully updated user details";
        this.alertService.addAlert(alert);
      });
  }

  submitUserUpdate() {
    this.user.fromJSON(this.userForm.value);
    this.updateUser(this.user);
  }
}
