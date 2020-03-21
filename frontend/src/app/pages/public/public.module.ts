import {NgModule} from '@angular/core';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {PublicRoutingModule} from "./public-routing.module";


@NgModule({
  imports: [
    PublicRoutingModule
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
