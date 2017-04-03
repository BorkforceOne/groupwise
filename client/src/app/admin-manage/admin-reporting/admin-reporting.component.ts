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
  private reportType: 'USER_ACQUISITION' | 'USER_TOTAL' | 'MATCH_ACTIVITY' | 'USERS_ALL' = 'USER_ACQUISITION';
  private users: User[] = [];
  private matches: Match[] = [];
  private csv = "";

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

  generateReport() {
    this.csv += "\ufeff";
    var userInfo = ['Firstname', 'Lastname', 'Email', 'Phone', 'Type', 'Gender', 'Birthday', 'Registered on', 'Matches'];
    this.getHeaders(userInfo);
    this.getBody(userInfo);
    if (navigator.msSaveBlob) {
      let filename = "MyReport.csv";
      let blob = new Blob([this.csv], {"type": "text/csv;charset=utf8;"});
      navigator.msSaveBlob(blob, filename);
    } else {
      let uri = 'data:text/csv;charset=utf-8,' + encodeURI(this.csv);
      let link = document.createElement("a");

      link.href = uri;

      link.setAttribute('visibility', 'hidden');
      link.download = "MyReport.csv";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  getHeaders(data) {
    let row = "";
    console.log(data[0]);
    for (var i = 0; i < data.length; i++) {
        row += data[i] + ",";
    }
    row = row.slice(0, -1);
    this.csv += row + "\r\n";
  }

  getBody(data) {
    for (var i = 0; i < this.users.length; i++) {
      let row = "";
      for (var j = 0; j < data.length; j++) {
        if (this.users[i][data[j]]) {
          if (data[j] == "Birthday"){
            row += this.formartData(`${moment(this.users[i]['Birthday']).format("MMMM Do YYYY")} (${moment().diff(moment(this.users[i]['Birthday']), 'years')})`) + ",";
          }
          else {
            row += this.formartData(this.users[i][data[j]]) + ",";
          }
        }
        if (data[j] == 'Registered on'){
          row += this.formartData(moment(this.users[i]['createdAt']).format("MMMM Do YYYY")) + ",";
        }
        if (data[j] == 'Matches'){
          var matches = 0;
          // Count the number of matches this user has
          let foundMatches = this.matches.filter((match: Match) => match.StudentUserId === this.users[i].Id || match.HostUserId === this.users[i].Id);
          foundMatches.forEach((match: Match) => {
            if (match.Status === 'APPROVED')
              matches ++;
          });
          row += this.formartData(matches) + ",";
        }

      }
      row.slice(0, row.length - 1);
      this.csv += row + "\r\n";
    }
  }

  formartData(data: any) {
    if (typeof data === 'string') {
      data = data.replace(/"/g, '""');
      if (data.indexOf(',') > -1 || data.indexOf('\n') > -1 || data.indexOf('\r') > -1) {
        data = '"' + data + '"';
      }
      return data;
    }
    if (typeof data === 'boolean') {
      return data ? 'TRUE' : 'FALSE';
    }
    return data;
  }

}
