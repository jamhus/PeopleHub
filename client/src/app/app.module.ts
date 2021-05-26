import { SharedModule } from './_modules/shared.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import { BrowserModule, } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AppRoutingModule } from './app-routing.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ListsComponent,
    MessagesComponent,
    RegisterComponent,
    MemberListComponent,
    MemberDetailComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
