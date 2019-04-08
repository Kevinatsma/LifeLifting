import { Component, OnInit, NgZone, HostListener } from '@angular/core';

// import { MaterialModule } from './../../../shared/material.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { AuthService } from './../../core/auth/auth.service';
import { Location } from '@angular/common';
import { User } from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  capsOn: Subject<boolean> = new Subject();
  signInForm: FormGroup;
  hide = true;

  constructor(
    public fb: FormBuilder,
    public auth: AuthService,
    private router: Router,
    public ngZone: NgZone
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
    return this.auth.emailSignIn(this.email.value, this.password.value)
    .then(() => {
      if (this.auth.authenticated) {
        this.router.navigate(['dashboard']);
      }
    });
  }

  googleLogin() {
    this.auth.googleLogin()
    .then(() => {
      this.ngZone.run(() => this.router.navigate(['dashboard']));
    });
  }

  facebookLogin() {
    this.auth.facebookLogin()
    .then(() => {
      if (this.auth.user) {
        this.router.navigate(['signup/step-one']);
        console.log('You don\'t have all necessary data yet..');
      } else {
        alert('Woops, you\'re not logged in. Try again!');
      }
    });
  }

  // Get Capslock state

  @HostListener('window:keydown', ['$event'])
    onKeyDown(event) {
    if (event.getModifierState && event.getModifierState('CapsLock')) {
      this.capsOn.next(true);
      } else {
      this.capsOn.next(false);
      }
    }

    @HostListener('window:keyup', ['$event'])
    onKeyUp(event) {
    if (event.getModifierState && event.getModifierState('CapsLock')) {
      this.capsOn.next(true);
    } else {
      this.capsOn.next(false);
    }
  }
}
