import { NgModule } from '@angular/core';
import { SharedModule } from './_modules/shared.module';
import { BrowserModule, } from '@angular/platform-browser';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { ListsComponent } from './lists/lists.component';
import { RegisterComponent } from './register/register.component';
import { MessagesComponent } from './messages/messages.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { RoleModalComponent } from './modals/role-modal/role-modal.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { DateInputComponent } from './_forms/date-input/date-input.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { PhotoManagementComponent } from './admin/photo-management/photo-management.component';
import { MemberMessageesComponent } from './members/member-messagees/member-messagees.component';


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
    PhotoEditorComponent,
    TextInputComponent,
    DateInputComponent,
    MemberMessageesComponent,
    AdminPanelComponent,
    HasRoleDirective,
    UserManagementComponent,
    PhotoManagementComponent,
    RoleModalComponent,
  ],
  imports: [
    FormsModule,
    SharedModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,useClass: ErrorInterceptor,multi: true},
    {provide: HTTP_INTERCEPTORS,useClass: JwtInterceptor,multi: true},
    {provide: HTTP_INTERCEPTORS,useClass: LoadingInterceptor,multi: true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
