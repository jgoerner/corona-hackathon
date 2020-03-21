import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  carouselImages: string[] = [
    'assets/agri.jpeg',
    'assets/supermarket.jpeg',
    'assets/logistics.jpeg',
  ];

  constructor(public sanitizer: DomSanitizer) {
  }

  ngOnInit() {
  }

}
