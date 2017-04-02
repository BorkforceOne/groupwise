import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Match} from "../../../services/match/match.model";

@Component({
  selector: 'app-report-match-activity',
  templateUrl: './report-match-activity.component.html',
  styleUrls: ['./report-match-activity.component.scss'],
  inputs: ['matchesData']
})
export class ReportMatchActivityComponent implements OnInit, OnChanges {
  private matchesData: Match[] = [];

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
    let data = [0, 0, 0, 0];

    let matches = this.matchesData.filter((match: Match) => {
      let foundResults = this.matchesData.filter((innerResult) => match.HostUserId === innerResult.HostUserId && match.StudentUserId === innerResult.StudentUserId);
      foundResults.sort((a, b) => a.Id > b.Id ? -1 : 1);

      if (foundResults.length > 1)
        return foundResults.indexOf(match) == 0;

      return true;
    });
    matches
      .forEach((match: Match) => {
        switch (match.Status) {
          case "APPROVED":
            data[0] ++;
            break;
          case "PROPOSED":
            data[1] ++;
            break;
          case "REJECTED":
            data[2] ++;
            break;
          case "UNMATCHED":
            data[3] ++;
            break;
        }
      });

    this.chartLabels = ['Approved Matches', 'Proposed Matches', 'Rejected Matches', 'Umatched Matches'];
    this.chartData = data;
    this.chartType = 'pie';
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateChart();
  }

}
