import { Injectable } from '@angular/core';

import { Alert } from './alert';

@Injectable()
export class AlertService {
  alerts: Alert[];

  constructor() {
    this.alerts = [];
  }

  addAlert(alert: Alert) {
    this.alerts.push(alert);
  }

  getAlerts(): Alert[] {
    return this.alerts;
  }

  removeAlert(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

}
