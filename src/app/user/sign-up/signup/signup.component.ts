import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from './../../../core/auth/auth.service';
import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { User } from '../../user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', './../../login/login.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  hide = true;
  user: Observable<User>;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private afs: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      displayName: ['', [Validators.required]],
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

    // this.userDoc = this.afs.doc<User>(`users/${this.auth.currentUserId}`);
    // this.user =  this.userDoc.valueChanges();
    // console.log(`${this.user}`);
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
    this.auth.googleLogin();
  }

  facebookLogin() {
    alert('We need the token first..');
  }
}
