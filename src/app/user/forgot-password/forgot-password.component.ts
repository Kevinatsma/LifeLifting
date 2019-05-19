import { Component, OnInit, NgZone, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { AuthService } from './../../core/auth/auth.service';
import { Location } from '@angular/common';
import { User } from '../user.model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss',  './../login/login.component.scss']
})

export class ForgotPasswordComponent implements OnInit {
  capsOn: Subject<boolean> = new Subject();
  resetPassForm: FormGroup;
  showThanks = false;

  constructor(
    public fb: FormBuilder,
    public auth: AuthService,
    private router: Router,
    public ngZone: NgZone
  ) {
    this.resetPassForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {}

  get email() {
    return this.resetPassForm.get('email');
  }

  resetPassword() {
    return this.auth.resetPassword(this.email.value)
    .then(() => {
      this.showThanks = true;
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
