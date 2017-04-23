import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/user/auth.service";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  private userId: number;
  private userType: "ADMINISTRATOR" | "HOST" | "STUDENT";

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getLoggedInUser()
      .subscribe((user) => {
        this.userId = user.Id;
        this.userType = user.Type;
      })
  }

}
