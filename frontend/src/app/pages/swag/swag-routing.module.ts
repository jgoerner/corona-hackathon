import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SwagComponent} from './swag.component';
import {ContractComponent} from "./contract/contract.component";
import {AccountComponent} from "./account/account.component";
import {EmployerProfileComponent} from "./offer/employer-profile/employer-profile.component";
import {CreateOfferComponent} from "./offer/create-offer/create-offer.component";
import {ListOffersComponent} from "./offer/list-offers/list-offers.component";
import {EmployeeProfileComponent} from "./find/employee-profile/employee-profile.component";
import {MatchingComponent} from "./find/matching/matching.component";

const routes: Routes = [
    {
      path: '', component: SwagComponent, children: [
        {path: 'account', component: AccountComponent},
        {path: 'contract/:id', component: ContractComponent},
        {path: 'contract', component: ContractComponent},
        {path: 'offer/profile', component: EmployerProfileComponent},
        {path: 'offer/create', component: CreateOfferComponent},
        {path: 'offer/list', component: ListOffersComponent},
        {path: 'find/profile', component: EmployeeProfileComponent},
        {path: 'find/matching', component: MatchingComponent},
        {path: '**', redirectTo: '/swag/account', pathMatch: 'full'}
      ],
    }
  ]
;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SwagRoutingModule {
}
