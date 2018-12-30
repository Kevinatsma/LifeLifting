import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { User } from '../../user.model';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { UserService } from '../../user.service';
import { Observable } from 'rxjs';
import { Timezone } from 'src/app/shared/data/models/timezone.model';
import { DataService } from 'src/app/shared/data/data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss', './../user-detail/user-detail.component.scss']
})
export class EditUserComponent implements OnInit, OnDestroy {
  @Input() user: User;
  aboutExtended = false;
  reviewsVisible = true;
  editUserForm: FormGroup;
  timezones: Observable<Timezone[]>;
  selectedTimeZone = 'Hello there';
  languages: FormArray;

  // Form

  constructor( private fb: FormBuilder,
               private userService: UserService,
               public dataService: DataService,
               public location: Location) {
                this.selectedTimeZone = 'Hello there';
               }

  ngOnInit() {
    this.timezones = this.dataService.getTimezones();
    this.editUserForm = this.fb.group({
      displayName: '' || this.user.displayName,
    });
  }

  // Getters

  get editShow(): boolean {
    return this.userService.editShow;
  }

  get languageForms() {
    return this.editUserForm.get('languages') as FormArray;
  }

  // Create a new Language
  createLanguage(): FormGroup {
    return this.fb.group({
      languageValue: '',
      languageLevel:  ''
    });
  }

  addLanguage(): void {
    this.languages = this.editUserForm.get('languages') as FormArray;
    this.languages.push(this.createLanguage());
  }

  deleteLanguage(i) {
    (this.editUserForm.get('languages') as FormArray).removeAt(i);
  }

  toggleEdit() {
      alert('TODO');
      // this.userService.toggleEdit();
  }

  ngOnDestroy() {
    this.userService.editShow = false;
  }

  editSpecialist() {
    const data = {
      // firstName: this.editUserForm.get('firstName').value || this.user.firstName,
      // lastName: this.editUserForm.get('lastName').value || this.specialist.lastName,
      // position: this.editUserForm.get('position').value || this.specialist.position,
      // speciality: this.editUserForm.get('speciality').value || this.specialist.speciality,
      // timeZone: this.editUserForm.get('timeZone').value || this.specialist.timeZone,
      // patientsTotal: this.editUserForm.get('patientsTotal').value || this.specialist.patientsTotal,
      // yearsOfExperience: this.editUserForm.get('yearsOfExperience').value || this.specialist.yearsOfExperience,
      // description:  this.editUserForm.get('description').value || this.specialist.description,
      // email:  this.editUserForm.get('email').value || this.specialist.email,
      // phoneNumber:  this.editUserForm.get('phoneNumber').value || this.specialist.phoneNumber,
    };
    this.userService.updateUser(this.user.uid, data);
    this.toggleEdit();
  }

    // Back Button

    goBack() {
      return this.location.back();
    }

}
