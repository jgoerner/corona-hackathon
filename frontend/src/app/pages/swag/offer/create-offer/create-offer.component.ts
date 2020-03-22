import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss']
})
export class CreateOfferComponent implements OnInit {

  currentStepIndex = 0;

  onIndexChange(index: number): void {
    this.currentStepIndex = index;
  }

  constructor() {
  }

  ngOnInit() {
  }

}
