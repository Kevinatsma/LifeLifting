import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-step-one',
  templateUrl: './signup-step-one.component.html',
  styleUrls: ['./signup-steps.scss']
})
export class SignupStepOneComponent implements OnInit {

  basicUserDataForm: FormGroup;

  // Gender options
  genders = [
    {value: 'female', viewValue: 'Female'},
    {value: 'male', viewValue: 'Male'},
    {value: 'other', viewValue: 'Other'}
  ]; selectedGender: string;

  // Heard from us through ... Options
  mediums = [
    {value: 'instagram', viewValue: 'Instagram'},
    {value: 'facebook', viewValue: 'Facebook'},
    {value: 'friends', viewValue: 'Friends told me'},
    {value: 'google', viewValue: 'I found you in Google'}
  ]; selectedMedium: string;

  constructor(
    public fb: FormBuilder,
    public auth: AuthService,
    public router: Router
  ) {

  }

  ngOnInit() {
    this.basicUserDataForm = this.fb.group({
      displayName: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      mainGoal: new FormControl('', [Validators.required]),
      heardFromUs: new FormControl('', [Validators.required]),
    });
  }

  updateUser() {
    // const data = this.basicUserDataForm.value;
    // this.auth.updateUser(data, user);
    // console.log(this.basicUserDataForm.value);
    this.router.navigate(['step-two']);
  }

}
