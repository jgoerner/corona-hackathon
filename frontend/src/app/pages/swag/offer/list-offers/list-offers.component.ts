import { Component, OnInit } from '@angular/core';
import {NzMessageService} from "ng-zorro-antd";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-list-offers',
  templateUrl: './list-offers.component.html',
  styleUrls: ['./list-offers.component.scss']
})

export class ListOffersComponent implements OnInit {
  listOfData = [
    {
      key: '1',
      company: 'ALDI',
      title: 'Supermarket Support',
      location: 'Munich'
    },
    {
      key: '1',
      company: 'AMAZON',
      title: 'Logistics Support',
      location: 'Berlin'
    },
    {
      key: '1',
      company: 'Zuckerrübe AG',
      title: 'Field Worker',
      location: 'Buxtehude'
    }
  ];

  ngOnInit(): void {
  }
}
