import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit {

  currentStepIndex = 0;

  constructor() {
  }

  ngOnInit() {
  }

  onIndexChange(index: number) {
    this.currentStepIndex = index;
  }
}
