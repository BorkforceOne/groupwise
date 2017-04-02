import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {User} from "../../../services/user/user";

@Component({
  selector: 'app-report-user-total',
  templateUrl: './report-user-total.component.html',
  styleUrls: ['./report-user-total.component.scss'],
  inputs: ['usersData']
})
export class ReportUserTotalComponent implements OnInit, OnChanges{
  private usersData: User[] = [];

  private chartData: Array<any> = [];
  private chartLabels: Array<any> = [];
  private chartOptions: any = {
    responsive: true
  };
  private chartType: string = 'pie';

  constructor() { }

  ngOnInit() {
    this.updateChart();
  }

  updateChart() {
    let data = [0, 0, 0];

    this.usersData
      .forEach((user: User) => {
        if (user.Type === 'HOST')
          data[0] += 1;
        if (user.Type === 'STUDENT')
          data[1] += 1;
        if (user.Type === 'ADMINISTRATOR')
          data[2] += 1;
      });

    this.chartLabels = ['Hosts', 'Students', 'Administrators'];
    this.chartData = data;
    this.chartType = 'pie';
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateChart();
  }

}
