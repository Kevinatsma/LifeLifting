import { Component, OnInit } from '@angular/core';

// import { MaterialModule } from './../../../shared/material.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from './../../core/auth/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  signInForm: FormGroup;
  hide = true;

  constructor(
    public fb: FormBuilder,
    public auth: AuthService,
    private router: Router,
    public location: Location
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          Validators.minLength(6)
        ]
      ]
    });
  }

  ngOnInit() {}

  get email() {
    return this.signInForm.get('email');
  }
  get password() {
    return this.signInForm.get('password');
  }

  signIn() {

    return this.auth
      .emailSignIn(this.email.value, this.password.value)
      .then(user => {
        if (this.signInForm.valid) {
          this.router.navigate(['/dashboard']);
        } else {
          alert('You don\'t have an account!');
        }
      });
  }

  // googleLogin() {
  //   this.auth.googleLogin();
  // }

  goBack() {
    this.location.back();
  }
}
