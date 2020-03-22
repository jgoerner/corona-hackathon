import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matching',
  templateUrl: './matching.component.html',
  styleUrls: ['./matching.component.scss']
})
export class MatchingComponent implements OnInit {
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
