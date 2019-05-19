import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { AuthService } from './../../../core/auth/auth.service';
import { User } from '../../user.model';
import { fadeAnimation } from './../../../core/animations/fade.animation';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', './../../login/login.component.scss'],
  animations: [ fadeAnimation ]
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  hide = true;
  user: Observable<User>;

  succesVisible = true;
  capsOn: Subject<boolean> = new Subject();

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          Validators.minLength(6),
          Validators.maxLength(25)
        ]
      ]
    });

    this.user = this.auth.user;
  }

  // Getters
  get email() {
    return this.signUpForm.get('email');
  }
  get password() {
    return this.signUpForm.get('password');
  }

  signUp() {
    return this.auth.emailSignUp(this.email.value, this.password.value)
      .then(() => {
        if (this.auth.user) {
          this.router.navigate(['signup/step-one']);
          return this.user = this.auth.user;
        }
      });
  }

  googleLogin() {
    this.auth.googleSignUp()
    .then(() => {
      if (this.auth.user) {
        this.router.navigate(['signup/step-one']);
        console.log('You don\'t have all necessary data yet..');
      } else {
        alert('Woops, you\'re not logged in. Try again!');
      }
    });
  }

  openSuccess() {
    this.succesVisible = true;
  }

  // Misc

  getState(o) {
    return o.activatedRouteData.state;
  }

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
