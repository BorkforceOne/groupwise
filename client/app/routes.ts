import {Routes} from "@angular/router";
import {ContactComponent} from "./contact/contact.component";
import {ChatComponent} from "./chat/chat.component";
import {LoggedinGuard} from "./guards/loggedin-guard";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {AdminManageComponent} from "./admin-manage/admin-manage.component";
import {HomeComponent} from "./home/home.component";
import {RegisterStudentAdditionalPreferencesComponent} from "./register/register-student-additional-preferences/register-student-additional-preferences.component";
import {RegisterStudentAdditionalPersonalInformationComponent} from "./register/register-student-additional-personal-information/register-student-additional-personal-information.component";
import {RegisterHostAdditionalPreferencesComponent} from "./register/register-host-additional-preferences/register-host-additional-preferences.component";
import {RegisterHostAdditionalPersonalInformationComponent} from "./register/register-host-additional-personal-information/register-host-additional-personal-information.component";
import {NotLoggedinGuard} from "./guards/not-loggedin-guard";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {RegisterGeneralInformationComponent} from "./register/register-general-information/register-general-information.component";
import {ConsumeTokenPageComponent} from "./consume-token-page/consume-token-page.component";
import {UserProfilePageComponent} from "./user-profile-page/user-profile-page.component";
import {StudentSearchPageComponent} from "./student-search-page/student-search-page.component";

export const AppRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'contact', component: ContactComponent },
  { path: 'chat', component: ChatComponent, canActivate: [LoggedinGuard] },
  { path: 'user-profile', component: UserProfilePageComponent, canActivate: [] },//Eventual Login guard
  { path: 'register', component: RegisterComponent, canActivate: [NotLoggedinGuard], canActivateChild: [NotLoggedinGuard],
    children: [
      { path: '', component: RegisterGeneralInformationComponent},
      { path: 'host-personal', component: RegisterHostAdditionalPersonalInformationComponent },
      { path: 'host-preferences', component: RegisterHostAdditionalPreferencesComponent },
      { path: 'student-personal', component: RegisterStudentAdditionalPersonalInformationComponent },
      { path: 'student-preferences', component: RegisterStudentAdditionalPreferencesComponent },
    ]},
  { path: 'login', component: LoginComponent, canActivate: [NotLoggedinGuard]},
  { path: 'validate', component: ConsumeTokenPageComponent },
  { path: 'student-search', component: StudentSearchPageComponent, canActivate: [LoggedinGuard] },
  { path: 'admin-manage', component: AdminManageComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent }
];
