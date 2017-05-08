import {Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ViewChild} from '@angular/core';
import {FileUploader} from "ng2-file-upload";
import {ConfigService} from "../../services/config/config.service";
import {AttributeService} from "../../services/attributes/attribute.service";
import {Attribute} from "../../services/attributes/attribute.model";
import { CookieService } from 'ngx-cookie';
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
  private bannerURL: string;
  private defaultBannerURL = "/assets/hero-cover-default.jpg";
  private isLoadingAttributes: boolean;
  private isLoadingBanner: boolean;
  private isLoadingFeaturedAttribute: boolean;

  constructor(private configService: ConfigService, private attributeService: AttributeService, private cookieService: CookieService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.isLoadingAttributes = true;
    this.attributeService.getAllAttributes()
      .subscribe(attributes => {
        this.attributes = attributes;
        this.isLoadingAttributes = false;
      }, () => {
        this.isLoadingAttributes = false;
      });

    this.isLoadingFeaturedAttribute = true;
    this.configService.getValue('FeaturedAttribute')
      .subscribe((value) => {
        this.featuredAttribute = value;
        this.isLoadingFeaturedAttribute = false;
      }, () => {
        this.isLoadingFeaturedAttribute = false;
      });

    this.isLoadingBanner = true;
    this.refreshBanner();

    this.uploader = new FileUploader({url: this.URL, autoUpload: true, authTokenHeader: 'X-XSRF-TOKEN', authToken: this.cookieService.get('XSRF-TOKEN')});

    this.uploader.onSuccessItem = (item: any , response: any, headers: any) => {
      response = JSON.parse(response);
      // Update the banner image with this new uploaded image
      this.configService.setValue('BannerId', response.Payload.Id)
        .then(() => this.refreshBanner())
    };

    this.uploader.onErrorItem = (item: any, response: any, headers: any) => {
      let alert = new Alert();
      alert.Text = "File upload failed";
      alert.Type = "danger";
      this.alertService.addAlert(alert);
    };
  }

  private refreshBanner() {
    this.configService.getValue("BannerId")
      .subscribe(value => {
        this.bannerURL = `/api/v1/attachments/${value}`;
        this.isLoadingBanner = false;
      }, () => {
        this.bannerURL = this.defaultBannerURL;
        this.isLoadingBanner = false;
      });
  }

  onChangeFeaturedAttribute() {
    this.configService.setValue('FeaturedAttribute', this.featuredAttribute);
  }

  selectTab(tab) {
    this.selectedTab = tab;
  }

  isLoading(): boolean {
    return (this.isLoadingBanner || this.isLoadingFeaturedAttribute || this.isLoadingAttributes);
  }

}
