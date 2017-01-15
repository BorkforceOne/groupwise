import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';
import { AlertModule, DropdownModule } from 'ng2-bootstrap';

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
    AdminManageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'contact', component: ContactComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'admin-manage', component: AdminManageComponent },
      { path: '', component: HomeComponent},
    ]),
    AlertModule,
    DropdownModule,
    FileUploadModule
  ],
  providers: [UserService, SocketService, ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
