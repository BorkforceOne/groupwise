import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {User} from "../../../services/user/user";
import {Match} from "../../../services/match/match.model";
import * as moment from 'moment';
import {CsvService} from "../../../services/report/csv.service";

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

  constructor(private csvService: CsvService) { }

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
      result['Age'] = user['Age'];
      result['Registered On'] = moment(user['createdAt']).format("MMMM Do YYYY");

      result['Matches'] = 0;
      result['Matched With'] = [];

      // Count the number of matches this user has
      let foundMatches = this.matchesData.filter((match: Match) => match.StudentUserId === user.Id || match.HostUserId === user.Id);
      foundMatches.forEach((match: Match) => {
        if (match.Status === 'APPROVED') {
          result['Matches'] ++;

          let matchedUser = null;

          if (user.Type === 'STUDENT')
            matchedUser = this.usersData.find((matchedUser) => matchedUser.Id === match.HostUserId);
          else
            matchedUser = this.usersData.find((matchedUser) => matchedUser.Id === match.StudentUserId);

          if (matchedUser != null)
            result['Matched With'].push(`${matchedUser.Firstname} ${matchedUser.Lastname}`);
        }
      });

      result['Matched With'] = result['Matched With'].join(',');

      return result;
    });
  }

  downloadReport() {
    this.csvService.download(this.data, `users-${moment().format('YY-MM-DD-H.m')}.csv`);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateTable();
  }

}
