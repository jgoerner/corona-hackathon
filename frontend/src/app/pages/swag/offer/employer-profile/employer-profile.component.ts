import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Employer, EmployerWebEndpoint} from '../../../../shared/apina-api';

@Component({
  selector: 'app-employer-profile',
  templateUrl: './employer-profile.component.html',
  styleUrls: ['./employer-profile.component.scss']
})
export class EmployerProfileComponent implements OnInit {
  validateForm: FormGroup;
  employer: Employer;

  constructor(private fb: FormBuilder,
              private employerWebEndpoint: EmployerWebEndpoint) {
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    const name = this.validateForm.get('name').value;
    const domain = this.validateForm.get('domain').value;
    const homepage = this.validateForm.get('homepage').value;
    if (this.employer && this.employer.id) {
      this.employerWebEndpoint.update(this.employer.id, name, domain, homepage).subscribe((employer) => {
      })
    } else {
      this.employerWebEndpoint.create(name, domain, homepage).subscribe((employer) => {
      })
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      domain: [null, [Validators.required]],
      homepage: [null, [Validators.required]]
    });
    this.employerWebEndpoint.getCurrent().subscribe((employer) => {
      if (employer) {
        this.employer = employer;
        this.validateForm.patchValue({
          'name': employer.name,
          'domain': employer.domain,
          'homepage': employer.homepage
        });
      }
    })
  }
}
