import { Component, OnInit } from '@angular/core';
import { FileUploader } from "ng2-file-upload/ng2-file-upload";
import {ConfigService} from "../services/config/config.service";
import {Observable} from "rxjs";
import {User} from "../services/user/user";
import {UserService} from "../services/user/user.service";

@Component({
  selector: 'app-admin-manage',
  templateUrl: './admin-manage.component.html',
  styleUrls: ['./admin-manage.component.scss']
})
export class AdminManageComponent implements OnInit {
  private URL: string = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api/v1/attachments";
  private uploader:FileUploader;
  private users: User[];


  constructor(private configService: ConfigService, private userService: UserService) { }

  ngOnInit() {
    this.uploader = new FileUploader({url: this.URL});

    this.uploader.onCompleteItem = (item: any , response: any, headers: any) => {
      response = JSON.parse(response);
      // Update the banner image with this new uploaded image
      this.configService.setValue('BannerId', response.Payload.Id);
    };

    this.uploader.onErrorItem = (item: any, response: any, headers: any) => {

    };

    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

}
