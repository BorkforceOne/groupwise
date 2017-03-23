import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../../services/config/config.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private dashboardContent: SafeHtml = "";

  constructor(private configService: ConfigService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.configService.getValue('DashboardContent')
      .subscribe((value) => {
        this.dashboardContent = this.sanitizer.bypassSecurityTrustHtml(value);
      });
  }

}
