import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import {User} from "../../services/user/user";
import {UserService} from "../../services/user/user.service";
import * as moment from 'moment';
import {MatchService} from "../../services/match/match.service";
import {Match} from "../../services/match/match.model";
import {CsvService} from "../../services/report/csv.service";

@Component({
  selector: 'app-admin-reporting',
  templateUrl: 'admin-reporting.component.html',
  styleUrls: ['admin-reporting.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class AdminReportingComponent implements OnInit {
  private reportType: 'USER_ACQUISITION' | 'USER_TOTAL' | 'MATCH_ACTIVITY' | 'USERS_ALL' = 'USER_ACQUISITION';
  private users: User[] = [];
  private matches: Match[] = [];

  constructor(private userService: UserService, private matchService: MatchService) {}

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
      });

    this.matchService.getMatches()
      .subscribe(matches => {
        this.matches = matches;
      });
  }
}
