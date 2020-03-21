import {NgModule} from '@angular/core';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {PublicRoutingModule} from "./public-routing.module";
import {NgZorroAntdModule} from "ng-zorro-antd";
import {ReactiveFormsModule} from "@angular/forms";
import {ApinaModule} from '../../apina-api';
import {CommonModule} from '@angular/common';


@NgModule({
  imports: [
    PublicRoutingModule,
    NgZorroAntdModule,
    CommonModule,
    ReactiveFormsModule,
    ApinaModule
  ],
  exports: [],
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  providers: [],
})
export class PublicModule {
}
