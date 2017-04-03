import {Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ViewChild} from '@angular/core';
import {FileUploader} from "ng2-file-upload";
import {ConfigService} from "../../services/config/config.service";
import {AttributeService} from "../../services/attributes/attribute.service";
import {Attribute} from "../../services/attributes/attribute.model";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {Alert} from "../../services/alert/alert";
import {AlertService} from "../../services/alert/alert.service";
import {List} from "../../services/list/list.model";
import {ListService} from "../../services/list/list.service";
import {ModalDirective} from "ng2-bootstrap";


@Component({
  selector: 'app-admin-configuration',
  templateUrl: 'admin-configuration.component.html',
  styleUrls: ['admin-configuration.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class AdminConfigurationComponent implements OnInit {
  @ViewChild('attributeEditModal') public addWhiteModal:ModalDirective;
  @ViewChild('attributeEditModal') public addBlackModal:ModalDirective;
  private URL: string = "/api/v1/attachments";
  private uploader: FileUploader;
  private attributes: Attribute [];
  private whitelist: List [];
  private blacklist: List [];
  private featuredAttribute: string;
  private selectedTab: number = 0;
  private bannerURL: string;
  private defaultBannerURL = "/assets/hero-cover-default.jpg";

  constructor(private configService: ConfigService, private attributeService: AttributeService, private cookieService: CookieService,
              private alertService: AlertService, private listService: ListService) { }

  ngOnInit() {
    this.attributeService.getAllAttributes()
      .subscribe(attributes => {
        this.attributes = attributes;
      });

    this.configService.getValue('FeaturedAttribute')
      .subscribe((value) => {
        this.featuredAttribute = value;
      });

    this.listService.getLists()
      .subscribe(whitelist => {
        this.whitelist = whitelist.filter((entry) => entry.List == "WHITELIST");
      });

    this.listService.getLists()
      .subscribe(blacklist => {
        this.blacklist = blacklist.filter((entry) => entry.List == "BLACKLIST");
      });

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
      }, () => {
        this.bannerURL = this.defaultBannerURL;
      });
  }

  onChangeFeaturedAttribute() {
    this.configService.setValue('FeaturedAttribute', this.featuredAttribute);
  }

  selectTab(tab) {
    this.selectedTab = tab;
  }

  addWhitelist(){
    console.log("Adding to Whitelist");
  }

  addBlacklist(){
    console.log("Adding to Blacklist");
  }

  submitWhiteList(){

  }

  submitBlackList(){

  }
}
