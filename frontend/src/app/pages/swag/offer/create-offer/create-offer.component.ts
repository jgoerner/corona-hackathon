import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss']
})
export class CreateOfferComponent implements OnInit {

  index = 0;
  disable = false;
  onIndexChange(index: number): void {
    this.index = index;
  }

  constructor() { }

  ngOnInit() {
  }

}
