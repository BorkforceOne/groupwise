import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../../services/config/config.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private dashboardContent: string = "";

  constructor(private configService: ConfigService) { }

  ngOnInit() {
    this.configService.getValue('DashboardContent')
      .subscribe((value) => {
        this.dashboardContent = value.Value;
      });
  }

}
