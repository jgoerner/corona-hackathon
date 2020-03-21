import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountEndpoint} from '../../../apina-api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private validateForm: FormGroup;

  constructor(private fb: FormBuilder,
              private accountEndpoint: AccountEndpoint) {
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
      this.accountEndpoint.login(
        this.validateForm.get('email').value,
        this.validateForm.get('password').value
      ).subscribe((res) => {
        console.log('works');
      });
    }
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
}
