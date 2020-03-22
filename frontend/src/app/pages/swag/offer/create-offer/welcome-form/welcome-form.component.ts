import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Job, JobWebEndpoint} from "../../../../../shared/apina-api";

@Component({
  selector: 'app-welcome-form',
  templateUrl: './welcome-form.component.html',
  styleUrls: ['./welcome-form.component.scss']
})
export class WelcomeFormComponent implements OnInit {

  @Input()
  job: Job;

  constructor() {
  }

  ngOnInit(): void {

  }

}
