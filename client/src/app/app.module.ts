import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './_modules/shared.module';
import { BrowserModule, } from '@angular/platform-browser';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { ListsComponent } from './lists/lists.component';
import { RegisterComponent } from './register/register.component';
import { MessagesComponent } from './messages/messages.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ListsComponent,
    MessagesComponent,
    RegisterComponent,
    MemberListComponent,
    TestErrorsComponent,
    MemberDetailComponent,
    NotFoundComponent,
    ServerErrorComponent,
    MemberCardComponent,
    MemberEditComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,useClass: ErrorInterceptor,multi: true},
    {provide: HTTP_INTERCEPTORS,useClass: JwtInterceptor,multi: true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
