import {Component, OnInit} from '@angular/core';
import {Account, AccountEndpoint} from "../../../shared/apina-api";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  account: Account;

  constructor(private accountEndpoint: AccountEndpoint) {
    this.accountEndpoint.activeAccount()
      .subscribe((account) => {
        this.account = account;
      });
  }

  ngOnInit() {
  }

}
