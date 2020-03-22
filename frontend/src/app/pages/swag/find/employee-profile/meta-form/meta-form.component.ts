import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Employee, EmployeeWebEndpoint} from "../../../../../shared/apina-api";

@Component({
  selector: 'app-meta-form',
  templateUrl: './meta-form.component.html',
  styleUrls: ['./meta-form.component.scss']
})
export class MetaFormComponent implements OnInit {

  employee: Employee;
  validateForm: FormGroup;

  constructor(private fb: FormBuilder,
              private employeeEndpoint: EmployeeWebEndpoint) {
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    const name = this.validateForm.get('name').value;
    const age = this.validateForm.get('age').value;
    const location = this.validateForm.get('location').value;
    if (this.employee && this.employee.id) {
      this.employeeEndpoint.update(this.employee.id, name, age, location, this.employee.germanSkill, this.employee.englishSkill, this.employee.licenseSkill, this.employee.studentSkill).subscribe((employee) => {
      })
    } else {
      this.employeeEndpoint.create(name, age, location, false, false, false, false).subscribe((employee) => {
      })
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      age: [null, [Validators.required]],
      location: [null, [Validators.required]]
    });
    this.employeeEndpoint.getCurrent().subscribe((employee) => {
      if (employee) {
        this.employee = employee;
        this.validateForm.patchValue({
          'name': employee.name,
          'age': employee.ageGroup,
          'location': employee.location
        });
      }
    })
  }
}
