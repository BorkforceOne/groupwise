import { Component, OnInit } from '@angular/core';
import { AlertService } from "../../services/alert/alert.service";
import { Alert } from "../../services/alert/alert";

@Component({
  selector: 'app-alerts',
  templateUrl: 'alerts.component.html',
  styleUrls: ['alerts.component.scss']
})
export class AlertsComponent implements OnInit {
  alerts: Alert[];

  constructor(private alertService : AlertService) { }

  ngOnInit() {
    this.getAlerts();
  }

  getAlerts() {
    this.alerts = this.alertService.getAlerts();
  }

  removeAlert(alert: Alert) {
    this.alertService.removeAlert(alert);
  }

}
