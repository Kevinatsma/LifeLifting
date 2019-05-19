import { Component, OnInit, NgZone, HostListener, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';
import { Location } from '@angular/common';
import { User } from '../user.model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss', './../login/login.component.scss']
})

export class PasswordResetComponent implements OnInit, OnDestroy {
  ngUnsubscribe: Subject<any> = new Subject<any>();
  actions;

  // The user management actoin to be completed
  mode: string;
  // Just a code Firebase uses to prove that
  // this is a real password reset.
  actionCode: string;

  capsOn: Subject<boolean> = new Subject();
  passwordResetForm: FormGroup;
  actionCodeChecked = false;
  passwordsMatch = false;
  hide = true;

  constructor(
    public fb: FormBuilder,
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    public ngZone: NgZone
  ) {
    this.passwordResetForm = this.fb.group({
      password: [
        '',
        [
          Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
          Validators.minLength(6),
        ],

      ],
      passwordConfirm: ['',
      [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6)
      ]]
    });
  }

  ngOnInit() {
    this.getParams();
  }

  ngOnDestroy() {
    // End all subscriptions listening to ngUnsubscribe
    // to avoid memory leaks.
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // Getters

  get password() {
    return this.passwordResetForm.get('password');
  }
  get passwordConfirm() {
    return this.passwordResetForm.get('passwordConfirm');
  }

  getParams() {
    this.route.queryParams
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(params => {
      // if we didn't receive any parameters,
      // we can't do anything
      if (!params) {
        this.router.navigate(['../login']);
      }

      this.mode = params['mode'];
      this.actionCode = params['oobCode'];

      switch (params['mode']) {
        case 'resetPassword': {
          // Verify the password reset code is valid.
          this.auth.getUser().verifyPasswordResetCode(this.actionCode).then(email => {
            this.actionCodeChecked = true;
          }).catch(e => {
            // Invalid or expired action code. Ask user to try to reset the password
            // again.
            alert(e);
            this.router.navigate(['../login']);
          });

        } break;
        default: {
          console.log('query parameters are missing');
          this.router.navigate(['../login']);
        }
      }
    });
  }

  resetPassword() {
    this.checkPassword();
    if (this.passwordsMatch) {
      // Save the new password.
      this.auth.getUser().confirmPasswordReset(
        this.actionCode,
        this.password.value
      ).then(resp => {
        // Password reset has been confirmed and new password updated.
        alert('New password has been saved');
        this.router.navigate(['../login']); }).catch(e => {
          // Error occurred during confirmation. The code might have
          // expired or the password is too weak. alert(e);
        });
    }
  }

  checkPassword() {
    if (this.password.value === this.passwordConfirm.value) {
      this.passwordsMatch = true;
    } else {
      this.passwordsMatch = false;
      return;
    }
  }

    // Get Capslock state

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event) {
    if (event.getModifierState && event.getModifierState('CapsLock')) {
      this.capsOn.next(true);
    } else {
      this.capsOn.next(false);
    }
    this.checkPassword();
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event) {
    if (event.getModifierState && event.getModifierState('CapsLock')) {
      this.capsOn.next(true);
    } else {
      this.capsOn.next(false);
    }
    this.checkPassword();
  }
}
