import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit {

  index = 0;
  disable = false;
  size = 'large';

  onIndexChange(index: number): void {
    this.index = index;
  }

  constructor() { }

  ngOnInit() {
  }

}
