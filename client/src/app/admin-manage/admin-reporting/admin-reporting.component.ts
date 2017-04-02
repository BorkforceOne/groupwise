import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import {User} from "../../services/user/user";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-admin-reporting',
  templateUrl: 'admin-reporting.component.html',
  styleUrls: ['admin-reporting.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class AdminReportingComponent implements OnInit {
  private users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
        console.log(this.dataToCSV(users));
      });
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
