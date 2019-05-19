import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { User } from '../../user.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../user.service';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { SpecialistService } from './../../../specialists/specialist.service';
import { Specialist } from './../../../specialists/specialist.model';

export interface Status {
  appointment?: boolean;
  appointmentAccepted?: boolean;
  appointmentCompleted?: boolean;
  accepted?: boolean;
  signUpCompleted?: boolean;
  subscriptionValid?: boolean;
}

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

  status: Status;

  // Gender options
  genders = [
    {value: 'female', viewValue: 'Female'},
    {value: 'male', viewValue: 'Male'},
    {value: 'other', viewValue: 'Other'}
  ]; selectedGender = '';

  constructor( private fb: FormBuilder,
               private userService: UserService,
               public specialistService: SpecialistService,
               private cdr: ChangeDetectorRef,
               public location: Location) {
               }

  ngOnInit() {
    this.specialists = this.specialistService.getSpecialists();
    this.editUserForm = this.fb.group({
      displayName: '' || this.user.displayName || 'Not filled in yet',
      country: '' || this.user.basicData.country || 'Not filled in yet',
      packageChoice: '' || this.user.packageChoice || 'Not filled in yet',
      specialist: this.selectedSpecialist || 'Not filled in yet',
      gender: this.selectedGender || 'Not filled in yet',
      age: '' || this.user.basicData.age || 'Not filled in yet',
      mainGoal: '' || this.user.basicData.mainGoal || 'Not filled in yet',
      heardFromUs: '' || this.user.basicData.heardFromUs || 'Not filled in yet',
      phoneNumber: '' || this.user.basicData.phoneNumber || 'Not filled in yet',
      email: '' || this.user.email || 'Not filled in yet',
      signUpCompleted: ''  || this.user.status.accepted,
      accepted: '' || this.user.status.accepted,
      // TODO subscription ended --> subscription valid
      subscriptionValid: '' || this.user.status.subscriptionValid,
      appointment: '' || this.user.status.appointment,
      appointmentAccepted: '' || this.user.status.appointmentAccepted,
      appointmentCompleted: '' || this.user.status.appointmentCompleted,
    });

    this.url = `users`;

    setTimeout(() => {
      this.getSpecialist(this.user);
      this.status = this.user.status;
    }, 200);
  }

  // Getters

  get editShow(): boolean {
    return this.userService.editShow;
  }

  getSpecialist(user) {
    this.specialistService.getSpecialistData(user.specialist).subscribe(specialist => this.specialist = specialist);
  }

  // Listeners
  onChange($event) {
    const el = $event.source._elementRef.nativeElement.getAttribute('formControlName');
    if (el === 'appointment') {
      this.status.appointment = $event.checked;
    } else if (el === 'appointmentAccepted') {
      this.status.appointmentAccepted  = $event.checked;
    } else if (el === 'appointmentCompleted') {
      this.status.appointmentCompleted  = $event.checked;
    } else if (el === 'accepted') {
      this.status.accepted  = $event.checked;
    } else if (el === 'signUpCompleted') {
      this.status.signUpCompleted  = $event.checked;
    } else if (el === 'subscriptionValid') {
      this.status.subscriptionValid  = $event.checked;
      if ($event.checked === true) {
        console.log('TODO DISABLE ALL');
      }
    }
    this.cdr.detectChanges();
  }

  disableAll() {
    this.status.appointment = false;
    this.status.appointmentAccepted  = false;
    this.status.appointmentCompleted  = false;
    this.status.accepted  = false;
    this.status.signUpCompleted  = false;
    this.status.subscriptionValid  = false;
    this.cdr.detectChanges();
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
      },
      status: this.status
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
