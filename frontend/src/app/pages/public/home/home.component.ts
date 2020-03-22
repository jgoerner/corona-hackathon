import {Component, OnInit} from '@angular/core';

interface ImageSlide {
  url: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  carouselImages: ImageSlide[] = [
    {
      url: 'assets/agri.jpeg',
      title: 'Landwirtschaft',
      text: 'In Zeiten der Corona-Krise sind Erntehelfer:innen unentbehrlich. Rauf auf den Acker!'
    },
    {
      url: 'assets/supermarket.jpeg',
      title: 'Lebensmittelversorgung',
      text: 'Supermärkte und ihre Lieferanten benötigen Unterstützung. Hilf\' mit, die Versorgung sicherzustellen!'
    },
    {
      url: 'assets/logistics.jpeg',
      title: 'Logistik',
      text: 'Systemkritische Transportprozesse müssen aufrechterhalten werden. Pack\' noch heute mit an!'
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
