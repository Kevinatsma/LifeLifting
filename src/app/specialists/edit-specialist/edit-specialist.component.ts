import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Specialist } from '../specialist.model';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { SpecialistService } from '../specialist.service';
import { Observable } from 'rxjs';
import { Timezone } from './../../shared/data/models/timezone.model';
import { DataService } from './../../shared/data/data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-specialist',
  templateUrl: './edit-specialist.component.html',
  styleUrls: ['./edit-specialist.component.scss', './../specialist-detail/specialist-detail.component.scss']
})
export class EditSpecialistComponent implements OnInit, OnDestroy {
  @Input() specialist: Specialist;
  aboutExtended = false;
  reviewsVisible = true;

  // Form
  editSpecialistForm: FormGroup;
  timezones: Observable<Timezone[]>;
  selectedTimeZone = 'Hello there';
  languages: FormArray;
  downloadURL: string | null;
  url: any;

  constructor( private fb: FormBuilder,
               private specialistService: SpecialistService,
               public dataService: DataService,
               public location: Location) {
               }

  ngOnInit() {
    this.timezones = this.dataService.getTimezones();
    this.selectedTimeZone = this.specialist.timeZone;
    this.editSpecialistForm = this.fb.group({
      firstName: '' || this.specialist.firstName,
      lastName: '' || this.specialist.lastName,
      position: '' || this.specialist.position,
      speciality: '' || this.specialist.speciality,
      country: '' || this.specialist.country,
      city: '' || this.specialist.city,
      timeZone: '' || this.specialist.timeZone,
      patientsTotal: '' || this.specialist.patientsTotal,
      yearsOfExperience: '' || this.specialist.yearsOfExperience,
      description:  '' || this.specialist.description,
      email:  '' || this.specialist.email,
      phoneNumber:  '' || this.specialist.phoneNumber,
      languages: this.fb.array([ this.createLanguage() ]) || this.specialist.languages,
    });
    this.url = `specialists`;
  }

  // Getters

  get editShow(): boolean {
    return this.specialistService.editShow;
  }

  get languageForms() {
    return this.editSpecialistForm.get('languages') as FormArray;
  }

  // Create a new Language
  createLanguage(): FormGroup {
    return this.fb.group({
      languageValue: '',
      languageLevel:  ''
    });
  }

  addLanguage(): void {
    this.languages = this.editSpecialistForm.get('languages') as FormArray;
    this.languages.push(this.createLanguage());
  }

  deleteLanguage(i) {
    (this.editSpecialistForm.get('languages') as FormArray).removeAt(i);
  }

  toggleEdit() {
      this.specialistService.toggleEdit();
  }

  ngOnDestroy() {
    this.specialistService.editShow = false;
  }

  editSpecialist() {
    const data = {
      firstName: this.editSpecialistForm.get('firstName').value || this.specialist.firstName,
      lastName: this.editSpecialistForm.get('lastName').value || this.specialist.lastName,
      photoURL: this.downloadURL || this.specialist.photoURL,
      position: this.editSpecialistForm.get('position').value || this.specialist.position,
      speciality: this.editSpecialistForm.get('speciality').value || this.specialist.speciality,
      country: this.editSpecialistForm.get('country').value || this.specialist.country,
      city: this.editSpecialistForm.get('city').value || this.specialist.city,
      timeZone: this.editSpecialistForm.get('timeZone').value || this.specialist.timeZone,
      patientsTotal: this.editSpecialistForm.get('patientsTotal').value || this.specialist.patientsTotal,
      yearsOfExperience: this.editSpecialistForm.get('yearsOfExperience').value || this.specialist.yearsOfExperience,
      description:  this.editSpecialistForm.get('description').value || this.specialist.description,
      email:  this.editSpecialistForm.get('email').value || this.specialist.email,
      phoneNumber:  this.editSpecialistForm.get('phoneNumber').value || this.specialist.phoneNumber,
    };
    this.specialistService.updateSpecialist(this.specialist.specialistID, data);
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
