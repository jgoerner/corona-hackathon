import {Component, OnInit} from '@angular/core';
import {Job} from "../../../../shared/apina-api";

@Component({
  selector: 'app-list-offers',
  templateUrl: './list-offers.component.html',
  styleUrls: ['./list-offers.component.scss']
})

export class ListOffersComponent implements OnInit {
  listOfData: Job[] = [
    {
      id: null,
      title: 'Supermarket Support',
      description: null,
      location: 'Munich',
      qty: 10,
      salary: 10
    },
    {
      id: null,
      title: 'Logistik Support',
      description: null,
      location: 'Berlin',
      qty: 10,
      salary: 10
    },
    {
      id: null,
      title: 'Feldarbeiter:in',
      description: null,
      location: 'Buxdehude',
      qty: 10,
      salary: 10
    }
  ];

  ngOnInit(): void {
  }
}
