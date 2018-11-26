import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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
    public router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.basicUserDataForm = this.fb.group({
      displayName: ['', [Validators.required]],
      age: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      country: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      mainGoal: ['', [Validators.required]],
      heardFromUs: ['', [Validators.required]]
    });
  }

  updateUser(user) {
    const data = {
      displayName: this.basicUserDataForm.get('displayName').value,
      basicData: {
        age: this.basicUserDataForm.get('age').value,
        gender: this.selectedGender,
        country: this.basicUserDataForm.get('country').value,
        phoneNumber: this.basicUserDataForm.get('phoneNumber').value,
        heardFromUs: this.selectedMedium,
        mainGoal: this.basicUserDataForm.get('mainGoal').value
      }
    };
    console.log(data);
    this.auth.setUserData(data, user);
    this.router.navigate(['../step-two'], { relativeTo: this.route });
  }

}
