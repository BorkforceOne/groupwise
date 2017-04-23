import {Routes} from "@angular/router";
import {ContactComponent} from "./contact/contact.component";
import {LoggedinGuard} from "./guards/loggedin-guard";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {AdminManageComponent} from "./admin-manage/admin-manage.component";
import {HomeComponent} from "./home/home.component";
import {NotLoggedinGuard} from "./guards/not-loggedin-guard";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {RegisterGeneralInformationComponent} from "./register/register-general-information/register-general-information.component";
import {ConsumeTokenPageComponent} from "./consume-token-page/consume-token-page.component";
import {UserProfilePageComponent} from "./user-profile-page/user-profile-page.component";
import {StudentSearchPageComponent} from "./student-search-page/student-search-page.component";
import {RegisterAttributesComponent} from "./register/register-attributes/register-attributes.component";
import {RegisterAddonPageComponent} from "./register/register-addon-page/register-addon-page.component";
import {HostGuard} from "./guards/host-guard";
import {FaqPageComponent} from "./faq-page/faq-page.component";
import {AdminGuard} from "./guards/admin-guard";
import {MyMatchesPageComponent} from "./my-matches-page/my-matches-page.component";
import {TosComponent} from "./register/tos/tos.component";
import {AccountPageComponent} from "./account-page/account-page.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";

export const AppRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'contact', component: ContactComponent },
  { path: 'faq', component: FaqPageComponent },
  { path: 'user-profile/:id', component: UserProfilePageComponent, canActivate: [LoggedinGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [NotLoggedinGuard], canActivateChild: [NotLoggedinGuard],
    children: [
      { path: '', component: RegisterGeneralInformationComponent},
      { path: 'prescreen', component: RegisterAddonPageComponent},
      { path: 'attributes', component: RegisterAttributesComponent},
      { path: 'tos', component: TosComponent}
    ]},
  { path: 'login', component: LoginComponent, canActivate: [NotLoggedinGuard]},
  { path: 'validate', component: ConsumeTokenPageComponent },
  { path: 'student-search', component: StudentSearchPageComponent, canActivate: [HostGuard] },
  { path: 'admin-manage', component: AdminManageComponent, canActivate: [AdminGuard] },
  { path: 'my-matches', component: MyMatchesPageComponent, canActivate: [LoggedinGuard]},
  { path: 'account', component: AccountPageComponent, canActivate: [LoggedinGuard]},
  { path: 'landing', component: LandingPageComponent, canActivate: [LoggedinGuard]},
  { path: 'home', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent }
];
