import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import {StudentProfile} from "../services/profile/student/student-profile";
import {User} from "../services/user/user";
//import {AttributeService} from "PATH";

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class UserProfilePageComponent implements OnInit {
  private user: User = new User();
  constructor() { }

  ngOnInit() {


    this.studentProfile.UserId = 1;
    this.user.Email = 'mrn24@nau.edu';
    this.user.Firstname = 'Matt';
    this.user.Lastname = 'Nielsen';
    this.user.Type = 'STUDENT'
    this.user.Age = 28;
    this.user.Gender = "M";
  }

}
