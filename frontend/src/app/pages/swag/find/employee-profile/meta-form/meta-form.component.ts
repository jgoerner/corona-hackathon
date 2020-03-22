import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmployeeWebEndpoint} from "../../../../../shared/apina-api";

@Component({
  selector: 'app-meta-form',
  templateUrl: './meta-form.component.html',
  styleUrls: ['./meta-form.component.scss']
})
export class MetaFormComponent implements OnInit {

  validateForm: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

  }

  constructor(private fb: FormBuilder,
              private employeeEndpoint: EmployeeWebEndpoint) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      age: [null, [Validators.required]],
      location: [null, [Validators.required]]
    });
  }

  dateMode = 'time';

  handleDateOpenChange(open: boolean): void {
    if (open) {
      this.dateMode = 'time';
    }
  }

  handleDatePanelChange(mode: string): void {
    console.log('handleDatePanelChange: ', mode);
  }

}
