import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes}   from '@angular/router';
import {
  AlertModule, DropdownModule, CollapseModule, TabsModule, ModalModule, CarouselModule,
  PaginationModule, AccordionModule
} from 'ng2-bootstrap';

import { NavbarComponent } from './navbar/navbar.component';
import { AppComponent } from './app.component';
import { ResultComponent } from './result/result.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { ContactComponent } from './contact/contact.component';
import { HeroCoverComponent } from './home/hero-cover/hero-cover.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavLoginComponent } from './navbar/nav-login/nav-login.component';
import { ChatComponent } from './chat/chat.component';
import { AdminManageComponent } from './admin-manage/admin-manage.component';
import { FileUploadModule } from "ng2-file-upload";
import {SocketService} from "./services/socket/socket.service";
import {UserService} from "./services/user/user.service";
import {ConfigService} from "./services/config/config.service";
import {AlertService} from "./services/alert/alert.service";
import { AlertsComponent } from './alerts/alerts.component';
import {LoggedinGuard} from "./guards/loggedin-guard";
import {AppRoutes} from "./routes";
import {NotLoggedinGuard} from "./guards/not-loggedin-guard";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterGeneralInformationComponent } from './register/register-general-information/register-general-information.component';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';
import { ConsumeTokenPageComponent } from './consume-token-page/consume-token-page.component';
import { StudentSearchPageComponent } from './student-search-page/student-search-page.component';
import {RegisterAttributeFieldComponent} from "./register/register-attributes/register-attribute-field/register-attribute-field.component";
import {RegisterAttributesComponent} from "./register/register-attributes/register-attributes.component";
import {AttributeService} from "./services/attributes/attribute.service";
import { MyDatePickerModule } from 'mydatepicker';
import { DateSelectComponent } from './date-select/date-select.component';
import { ChatMessageComponent } from './chat/chat-message/chat-message.component';
import {MomentModule} from "angular2-moment";
import { AgePipe } from './age.pipe';
import {CookieService} from "angular2-cookie/services/cookies.service";
import { AdminConfigurationComponent } from './admin-manage/admin-configuration/admin-configuration.component';
import { AdminAttributesComponent } from './admin-manage/admin-attributes/admin-attributes.component';
import { AdminReportingComponent } from './admin-manage/admin-reporting/admin-reporting.component';
import { ChatWindowComponent } from './chat/chat-window/chat-window.component';
import {ChatService} from "./services/chat/chat.service";
import { RegisterAddonPageComponent } from './register/register-addon-page/register-addon-page.component';
import {AuthService} from "./services/user/auth.service";
import { ProfileAttributeComponent } from './user-profile-page/profile-attribute/profile-attribute.component';
import { AutoFocusDirective } from './auto-focus.directive';
import {AdminGuard} from "./guards/admin-guard";
import {StudentGuard} from "./guards/student-guard";
import {HostGuard} from "./guards/host-guard";
import {MatchService} from "./services/match/match.service";
import {FroalaEditorModule, FroalaViewModule} from "angular2-froala-wysiwyg";
import { PageEditorComponent } from './admin-manage/admin-configuration/page-editor/page-editor.component';
import { RemoteHtmlContentComponent } from './remote-html-content/remote-html-content.component';
import { FaqPageComponent } from './faq-page/faq-page.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { TooltipModule } from 'ng2-bootstrap/tooltip';
import { AdminApprovalQueueComponent } from './admin-manage/admin-approval-queue/admin-approval-queue.component';
import {TextMaskModule} from 'angular2-text-mask';
import {MyMatchesPageComponent} from "./my-matches-page/my-matches-page.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ResultComponent,
    DashboardComponent,
    ContactComponent,
    HeroCoverComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavLoginComponent,
    ChatComponent,
    AdminManageComponent,
    AlertsComponent,
    RegisterAttributesComponent,
    PageNotFoundComponent,
    RegisterGeneralInformationComponent,
    ConsumeTokenPageComponent,
    UserProfilePageComponent,
    StudentSearchPageComponent,
    RegisterAttributeFieldComponent,
    DateSelectComponent,
    ChatMessageComponent,
    AgePipe,
    AdminConfigurationComponent,
    AdminAttributesComponent,
    AdminReportingComponent,
    ChatWindowComponent,
    RegisterAddonPageComponent,
    ProfileAttributeComponent,
    AutoFocusDirective,
    PageEditorComponent,
    RemoteHtmlContentComponent,
    FaqPageComponent,
    SpinnerComponent,
    AdminApprovalQueueComponent,
    MyMatchesPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TextMaskModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes),
    AlertModule.forRoot(),
    DropdownModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    CollapseModule.forRoot(),
    FileUploadModule,
    MyDatePickerModule,
    MomentModule,
    TabsModule.forRoot(),
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    TooltipModule.forRoot()
  ],
  providers: [UserService, SocketService, ConfigService, AlertService, LoggedinGuard, NotLoggedinGuard, AttributeService,
    CookieService, ChatService, AuthService, AdminGuard, StudentGuard, HostGuard, MatchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
