import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-signup-step-two',
  templateUrl: './signup-step-two.component.html',
  styleUrls: ['./signup-step-two.component.scss', './../signup-step-one/signup-steps.scss']
})
export class SignupStepTwoComponent implements OnInit {

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
    public auth: AuthService
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

  updateUser(user) {
    const data = this.basicUserDataForm.value;
    this.auth.updateUser(data, user);
    console.log(this.basicUserDataForm.value);
  }

}
