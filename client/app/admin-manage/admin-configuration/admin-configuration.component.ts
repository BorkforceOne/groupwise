import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import {FileUploader} from "ng2-file-upload";
import {ConfigService} from "../../services/config/config.service";
import {AttributeService} from "../../services/attributes/attribute.service";
import {Attribute} from "../../services/attributes/attribute.model";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {Alert} from "../../services/alert/alert";
import {AlertService} from "../../services/alert/alert.service";

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
  private attributes: Attribute [];
  private featuredAttribute: string;
  private selectedTab: number = 0;

  constructor(private configService: ConfigService, private attributeService: AttributeService, private cookieService: CookieService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.attributeService.getAllAttributes()
      .subscribe(attributes => {
        this.attributes = attributes;
      });

    this.configService.getValue('FeaturedAttribute')
      .subscribe((config) => {
        this.featuredAttribute = config.Value;
      });

    this.uploader = new FileUploader({url: this.URL, autoUpload: true, authTokenHeader: 'X-XSRF-TOKEN', authToken: this.cookieService.get('XSRF-TOKEN')});

    this.uploader.onSuccessItem = (item: any , response: any, headers: any) => {
      response = JSON.parse(response);
      // Update the banner image with this new uploaded image
      this.configService.setValue('BannerId', response.Payload.Id);
    };

    this.uploader.onErrorItem = (item: any, response: any, headers: any) => {
      let alert = new Alert();
      alert.Text = "File upload failed";
      alert.Type = "danger";
      this.alertService.addAlert(alert);
    };
  }

  onChangeFeaturedAttribute() {
    this.configService.setValue('FeaturedAttribute', this.featuredAttribute);
  }

  selectTab(tab) {
    this.selectedTab = tab;
  }

}
