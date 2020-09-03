import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from './../../../core/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-client-dialog',
  templateUrl: './add-client-dialog.component.html',
  styleUrls: ['./add-client-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddClientDialogComponent implements OnInit {
  // FormGroups
  signUpForm: FormGroup;
  personalForm: FormGroup;
  hide = true;

  downloadURL: string | null;

  languageLevels = [
    {
      value: 'proficient',
      viewValue: 'Fluent - pretty much mother tongue'
    },
    {
      value: 'advanced',
      viewValue: 'Advanced - comfortable in most situations'
    },
    {
      value: 'intermediate',
      viewValue: 'Intermediate - able to have a conversation'
    },
    {
      value: 'beginner',
      viewValue: 'Beginner - a few words and sentences'
    },
  ]; selectedLevel: string;

  receiveDownloadURL($event) {
    return this.downloadURL = $event;
  }

  constructor( private fb: FormBuilder,
               private auth: AuthService,
               private dialog: MatDialog) {}

  ngOnInit() {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          // Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]'),
          Validators.minLength(6),
          Validators.maxLength(25),
          Validators.required
        ]
      ]
    });

    this.personalForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    });
  }


  // Getters
  get email() {
    return this.signUpForm.get('email');
  }
  get password() {
    return this.signUpForm.get('password');
  }

  userSignup() {
    const email = this.email.value;
    const password = this.password.value;
    const formData = {
      displayName: this.personalForm.get('firstName').value + ' ' + this.personalForm.get('lastName').value,
      photoURL: this.downloadURL || null,
      email: email,
    };

    // Add user in FireAuth
    return this.auth.addUser(email, password, formData)
    .then(() => {
      // Reset form
      this.signUpForm.reset();
      this.personalForm.reset();
    });
  }

  closeDialog() {
    if (confirm('Are you sure you want to stop adding this client?')) {
      this.dialog.closeAll();
    }
  }
}