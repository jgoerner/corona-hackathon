import {NgModule} from '@angular/core';

import {SwagRoutingModule} from './swag-routing.module';

import {SwagComponent} from './swag.component';
import {NgZorroAntdModule} from "ng-zorro-antd";
import {ContractComponent} from './contract/contract.component';
import {EmployeeProfileComponent} from './find/employee-profile/employee-profile.component';
import {MatchingComponent} from './find/matching/matching.component';
import {ContractDetailComponent} from './contract/contract-detail/contract-detail.component';
import {EmployerProfileComponent} from './offer/employer-profile/employer-profile.component';
import {CreateOfferComponent} from './offer/create-offer/create-offer.component';
import {ListOffersComponent} from './offer/list-offers/list-offers.component';
import {AccountComponent} from './account/account.component';
import {ApinaModule} from '../../apina-api';
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SwagRoutingModule,
    NgZorroAntdModule,
    ApinaModule
  ],
  declarations: [SwagComponent, ContractComponent, EmployeeProfileComponent, MatchingComponent, ContractDetailComponent, EmployerProfileComponent, CreateOfferComponent, ListOffersComponent, AccountComponent],
  exports: [SwagComponent]
})
export class SwagModule {
}
