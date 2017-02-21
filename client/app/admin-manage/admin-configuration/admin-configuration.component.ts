import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import {FileUploader} from "ng2-file-upload";
import {ConfigService} from "../../services/config/config.service";

@Component({
  selector: 'app-admin-configuration',
  templateUrl: 'admin-configuration.component.html',
  styleUrls: ['admin-configuration.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class AdminConfigurationComponent implements OnInit {
  private URL: string = "/api/v1/attachments";
  private uploader: FileUploader;

  constructor(private configService: ConfigService) { }

  ngOnInit() {
    this.uploader = new FileUploader({url: this.URL});

    this.uploader.onCompleteItem = (item: any , response: any, headers: any) => {
      response = JSON.parse(response);
      // Update the banner image with this new uploaded image
      this.configService.setValue('BannerId', response.Payload.Id);
    };

    this.uploader.onErrorItem = (item: any, response: any, headers: any) => {

    };
  }

}
