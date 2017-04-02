import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import {User} from "../../services/user/user";
import {UserService} from "../../services/user/user.service";
import * as moment from 'moment';
import {MatchService} from "../../services/match/match.service";
import {Match} from "../../services/match/match.model";

@Component({
  selector: 'app-admin-reporting',
  templateUrl: 'admin-reporting.component.html',
  styleUrls: ['admin-reporting.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class AdminReportingComponent implements OnInit {
  private reportType: 'USER_ACQUISITION' | 'USER_TOTAL' | 'MATCH_ACTIVITY' = 'USER_ACQUISITION';
  private users: User[] = [];
  private matches: Match[] = [];

  private chartData: Array<any> = [];
  private chartLabels: Array<any> = [];
  private chartOptions: any = {
    responsive: true
  };
  private chartType: string = 'bar';

  constructor(private userService: UserService, private matchService: MatchService) { }

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

  dataToCSV(data) {
    let keys = Object.keys(data[0]);
    let columnDelimiter = ',';
    let lineDelimiter = '\n';

    let result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    let ctr = 0;
    data.forEach((item) => {
      ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];
        ctr++;
      });

      result += lineDelimiter;
    });

    return result;
  }
}
