import {Component, OnInit} from '@angular/core';
import {Job} from "../../../../shared/apina-api";

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss']
})
export class CreateOfferComponent implements OnInit {

  currentStepIndex = 0;
  job: Job;

  constructor() {
  }

  onIndexChange(index: number): void {
    this.currentStepIndex = index;
  }

  ngOnInit() {
  }

}
