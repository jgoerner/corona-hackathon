import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {IconsProviderModule} from './icons-provider.module';
import {de_DE, NgZorroAntdModule, NZ_I18N} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import de from '@angular/common/locales/de';
import {PublicModule} from "./pages/public/public.module";
import {SharedModule} from './shared/shared.module';

registerLocaleData(de);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    BrowserAnimationsModule,
    PublicModule,
    SharedModule
  ],
  providers: [{provide: NZ_I18N, useValue: de_DE}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
