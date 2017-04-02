import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import {User} from "../../services/user/user";
import {UserService} from "../../services/user/user.service";
import * as moment from 'moment';

@Component({
  selector: 'app-admin-reporting',
  templateUrl: 'admin-reporting.component.html',
  styleUrls: ['admin-reporting.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class AdminReportingComponent implements OnInit {
  private users: User[];
  private newUserChartData: Array<any> = [];
  private newUserLabels: Array<any> = [];
  private newUserOptions: any = {
    responsive: true
  };
  private newUserLegend: boolean = true;
  private newUserType: string = 'bar';

  private usersChartData: Array<any> = [];
  private usersLabels: Array<any> = [];
  private usersOptions: any = {
    responsive: true
  };
  private usersLegend: boolean = true;
  private usersType: string = 'pie';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
        this.generateNewStudentChart();
        this.generateUsersChart();
      });
  }

  generateNewStudentChart() {
    let studentData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let hostData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    let collectionFunction = (user, collection) => {
      let current = moment();
      let createdAt = moment(user.createdAt);
      if (current.diff(createdAt, 'years') <= 1)
        collection[11 - current.diff(createdAt, 'months')] += 1;
    };

    let chartLabelFunction = () => {
      let chartLabels = [];

      for (let i = 11; i >= 0; i --)
        chartLabels.push(moment().subtract(i, 'months').format('MMMM YYYY'));

      return chartLabels;
    };

    this.users
      .filter((user) => user.Type === 'STUDENT')
      .forEach((user) => collectionFunction(user, studentData));

    this.users
      .filter((user) => user.Type === 'HOST')
      .forEach((user) => collectionFunction(user, hostData));

    this.newUserLabels = chartLabelFunction();

    this.newUserChartData = [
      {
        data: studentData,
        label: 'New Students'
      },
      {
        data: hostData,
        label: 'New Hosts'
      }
    ];
  }

  generateUsersChart() {
    let data = [0, 0, 0];

    let collectionFunction = (user: User, collection: any[]) => {
      if (user.Type === 'HOST')
        collection[0] += 1;
      if (user.Type === 'STUDENT')
        collection[1] += 1;
      if (user.Type === 'ADMINISTRATOR')
        collection[2] += 1;
    };

    let chartLabelFunction = () => {
      return ['Hosts', 'Students', 'Administrators'];
    };

    this.users
      .forEach((user) => collectionFunction(user, data));

    this.usersLabels = chartLabelFunction();

    this.usersChartData = data;
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
