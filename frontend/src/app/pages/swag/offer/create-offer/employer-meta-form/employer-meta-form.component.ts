import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Job, JobWebEndpoint} from "../../../../../shared/apina-api";
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: 'app-employer-meta-form',
  templateUrl: './employer-meta-form.component.html',
  styleUrls: ['./employer-meta-form.component.scss']
})
export class EmployerMetaFormComponent implements OnInit {

  validateForm: FormGroup;

  @Input()
  job: Job;

  @Output()
  jobChange: EventEmitter<Job> = new EventEmitter<Job>();

  constructor(private fb: FormBuilder, private jobWebEndpoint: JobWebEndpoint, private message: NzMessageService) {
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    const name = this.validateForm.get('name').value;
    const description = this.validateForm.get('description').value;
    const location = this.validateForm.get('location').value;
    const quantity = this.validateForm.get('quantity').value;
    const salary = this.validateForm.get('salary').value;

    this.jobWebEndpoint.create(description, name, location, quantity, salary, false, false, false, false)
      .subscribe(job => {
        this.message.create('success', `Super! Der Job ist angelegt!`);
        this.jobChange.emit(job);
      });
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [null, [Validators.required]],
      location: [null, [Validators.required]],
      quantity: [1, [Validators.required, Validators.min(0)]],
      salary: [12, [Validators.required, Validators.min(0)]]
    });
  }
}
