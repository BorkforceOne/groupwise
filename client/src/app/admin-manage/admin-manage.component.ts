import { Component, OnInit } from '@angular/core';
import { FileUploader } from "ng2-file-upload/ng2-file-upload";
import {ConfigService} from "../services/config/config.service";
import {Observable} from "rxjs";
import {User} from "../services/user/user";
import {UserService} from "../services/user/user.service";
import {AttributeService} from "../services/attributes/attribute.service";
import {Attribute} from "../services/attributes/attribute.model";
import {AttributeString} from "../services/attributes/attribute-string.model";

@Component({
  selector: 'app-admin-manage',
  templateUrl: './admin-manage.component.html',
  styleUrls: ['./admin-manage.component.scss']
})
export class AdminManageComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {

  }

}
