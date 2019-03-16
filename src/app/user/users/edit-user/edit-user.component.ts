import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { User } from '../../user.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../user.service';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { SpecialistService } from './../../../specialists/specialist.service';
import { Specialist } from './../../../specialists/specialist.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./../user-detail/user-detail.component.scss', './edit-user.component.scss']
})
export class EditUserComponent implements OnInit, OnDestroy {
  @Input() user: User;
  aboutExtended = false;
  reviewsVisible = true;

  // Form
  editUserForm: FormGroup;
  specialist: Specialist;
  specialists: Observable<Specialist[]>;
  selectedSpecialist = '';
  downloadURL: string | null;
  url: any;

  // Gender options
  genders = [
    {value: 'female', viewValue: 'Female'},
    {value: 'male', viewValue: 'Male'},
    {value: 'other', viewValue: 'Other'}
  ]; selectedGender = '';

  constructor( private fb: FormBuilder,
               private userService: UserService,
               public specialistService: SpecialistService,
               public location: Location) {
               }

  ngOnInit() {
    this.specialists = this.specialistService.getSpecialists();
    this.editUserForm = this.fb.group({
      displayName: '' || this.user.displayName,
      country: '' || this.user.basicData.country,
      packageChoice: '' || this.user.packageChoice,
      specialist: this.selectedSpecialist,
      gender: this.selectedGender,
      age: '' || this.user.basicData.age,
      mainGoal: '' || this.user.basicData.mainGoal,
      heardFromUs: '' || this.user.basicData.heardFromUs,
      phoneNumber: '' || this.user.basicData.phoneNumber,
      email: '' || this.user.email,
    });
    this.url = `users`;

    setTimeout(() => {
      this.getSpecialist(this.user);
    }, 200);
  }

  // Getters

  get editShow(): boolean {
    return this.userService.editShow;
  }

  getSpecialist(user) {
    this.specialistService.getSpecialistData(user.specialist).subscribe(specialist => {
      this.specialist = specialist;
    });
  }

  // Toggles

  toggleEdit() {
      this.userService.toggleEdit();
  }

  ngOnDestroy() {
    this.userService.editShow = false;
  }

  editUser() {
    const data = {
      displayName: this.editUserForm.get('displayName').value || this.user.displayName,
      packageChoice: this.editUserForm.get('packageChoice').value || this.user.packageChoice,
      email:  this.editUserForm.get('email').value || this.user.email,
      specialist: this.selectedSpecialist || this.user.specialist,
      photoURL: this.downloadURL || this.user.photoURL,
      basicData: {
        gender: this.selectedGender || this.user.basicData.gender,
        country: this.editUserForm.get('country').value || this.user.basicData.country,
        age: this.editUserForm.get('age').value || this.user.basicData.age,
        mainGoal: this.editUserForm.get('mainGoal').value || this.user.basicData.mainGoal,
        heardFromUs:  this.editUserForm.get('heardFromUs').value || this.user.basicData.heardFromUs || null,
        phoneNumber:  this.editUserForm.get('phoneNumber').value || this.user.basicData.phoneNumber,
      }
    };
    this.userService.updateUser(this.user.uid, data);
    this.toggleEdit();
  }

  receiveDownloadURL($event) {
    return this.downloadURL = $event;
  }

    // Back Button

    goBack() {
      return this.location.back();
    }

}
