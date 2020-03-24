import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountEndpoint} from '../../../shared/apina-api';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../../../shared/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;

  constructor(private fb: FormBuilder,
              private accountEndpoint: AccountEndpoint,
              private http: HttpClient,
              private authService: AuthService,
              private router: Router) {
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    const email = this.validateForm.get('email').value.trim().toLowerCase();
    const password = this.validateForm.get('password').value;

    const data = 'email=' + encodeURIComponent(email) +
      '&password=' + encodeURIComponent(password);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    this.http.post("/api/v1/login", data, {headers})
      .subscribe((res) => {
        this.authService.reCheckIfSessionActive();
      });
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
}
