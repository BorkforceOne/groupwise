import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as moment from 'moment';
import {User} from "../../../services/user/user";

@Component({
  selector: 'app-report-user-acquisition',
  templateUrl: './report-user-acquisition.component.html',
  styleUrls: ['./report-user-acquisition.component.scss'],
  inputs: ['usersData']
})
export class ReportUserAcquisitionComponent implements OnInit, OnChanges {
  private usersData: User[] = [];

  private chartData: Array<any> = [];
  private chartLabels: Array<any> = [];
  private chartOptions: any = {
    responsive: true
  };
  private chartType: string = 'bar';

  constructor() { }

  ngOnInit() {
    this.updateChart();
  }

  private updateChart() {
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

    this.usersData
      .filter((user) => user.Type === 'STUDENT')
      .forEach((user) => collectionFunction(user, studentData));

    this.usersData
      .filter((user) => user.Type === 'HOST')
      .forEach((user) => collectionFunction(user, hostData));

    this.chartLabels = chartLabelFunction();
    this.chartData = [
      {
        data: studentData,
        label: 'New Students'
      },
      {
        data: hostData,
        label: 'New Hosts'
      }
    ];
    this.chartType = 'bar';
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateChart();
  }

}
