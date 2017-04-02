import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {User} from "../../../services/user/user";
import {Match} from "../../../services/match/match.model";
import * as moment from 'moment';

@Component({
  selector: 'app-report-users-table',
  templateUrl: './report-users-table.component.html',
  styleUrls: ['./report-users-table.component.scss'],
  inputs: ['usersData', 'matchesData']
})
export class ReportUsersTableComponent implements OnInit, OnChanges {
  private usersData: User[] = [];
  private matchesData: Match[] = [];

  private data: Array<any> = [];

  constructor() { }

  ngOnInit() {
    this.updateTable();
  }

  updateTable() {
    this.data = this.usersData.map((user) => {
      let result = {};

      result['Firstname'] = user['Firstname'];
      result['Lastname'] = user['Lastname'];
      result['Email'] = user['Email'];
      result['Phone'] = user['Phone'];
      result['Type'] = user['Type'];
      result['Gender'] = user['Gender'];
      result['Birthday'] = `${moment(user['Birthday']).format("MMMM Do YYYY")} (${moment().diff(moment(user['Birthday']), 'years')})`;
      result['Registered On'] = moment(user['createdAt']).format("MMMM Do YYYY");

      result['Matches'] = 0;

      // Count the number of matches this user has
      let foundMatches = this.matchesData.filter((match: Match) => match.StudentUserId === user.Id || match.HostUserId === user.Id);
      foundMatches.forEach((match: Match) => {
        if (match.Status === 'APPROVED')
          result['Matches'] ++;
      });

      return result;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateTable();
  }

}
