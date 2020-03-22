import {Component, OnInit} from '@angular/core';
import {Contract} from "../../../shared/apina-api";

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {
  contracts: Contract[] = [
    {
      id: null,
      employeeId: null,
      jobId: null,
      signed: false,
      timestamp: new Date(),
      videoVerified: false
    },
    {
      id: null,
      employeeId: null,
      jobId: null,
      signed: false,
      timestamp: new Date(),
      videoVerified: false
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
