import {NgModule} from '@angular/core';
import {AuthService} from './auth.service';
import {AuthGuard} from './auth.guard';
import {ApinaModule} from './apina-api';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {LoginGuard} from "./login.guard";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ApinaModule,
    NgZorroAntdModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ApinaModule,
    NgZorroAntdModule
  ],
  declarations: [],
  providers: [
    AuthService,
    AuthGuard,
    LoginGuard
  ],
})
export class SharedModule {
}
