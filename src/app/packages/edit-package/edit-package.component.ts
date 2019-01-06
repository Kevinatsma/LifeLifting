import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { User } from '../../user/user.model';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { PackageService } from './../package.service';
import { Observable } from 'rxjs';
import { Timezone } from 'src/app/shared/data/models/timezone.model';
import { DataService } from 'src/app/shared/data/data.service';
import { Location } from '@angular/common';
import { SpecialistService } from 'src/app/specialists/specialist.service';
import { Specialist } from 'src/app/specialists/specialist.model';
import { Package } from '../package.model';

@Component({
  selector: 'app-edit-package',
  templateUrl: './edit-package.component.html',
  styleUrls: ['./../package-detail/package-detail.component.scss', './edit-package.component.scss']
})
export class EditPackageComponent implements OnInit, OnDestroy {
  @Input() package: Package;
  aboutExtended = false;
  reviewsVisible = true;

  // Form
  editUserForm: FormGroup;
  specialists: Observable<Specialist[]>;
  selectedSpecialist = '';
  downloadURL: string | null;

  // Gender options
  genders = [
    {value: 'female', viewValue: 'Female'},
    {value: 'male', viewValue: 'Male'},
    {value: 'other', viewValue: 'Other'}
  ]; selectedGender = '';

  constructor( private fb: FormBuilder,
               private packageService: PackageService,
               public specialistService: SpecialistService,
               public location: Location) {
               }

  ngOnInit() {
    this.specialists = this.specialistService.getSpecialists();
    // this.editUserForm = this.fb.group({
    //   displayName: '' || this.user.displayName,
    //   country: '' || this.user.basicData.country,
    //   packageChoice: '' || this.user.packageChoice,
    //   specialist: this.selectedSpecialist,
    //   gender: this.selectedGender,
    //   age: '' || this.user.basicData.age,
    //   mainGoal: '' || this.user.basicData.mainGoal,
    //   phoneNumber: '' || this.user.basicData.phoneNumber,
    //   email: '' || this.user.email,
    // });
  }

  // Getters

  get editShow(): boolean {
    return this.packageService.editShow;
  }

  toggleEdit() {
      this.packageService.toggleEdit();
  }

  ngOnDestroy() {
    this.packageService.editShow = false;
  }

  editUser() {
    // const data = {
    //   displayName: this.editUserForm.get('displayName').value || this.user.displayName,
    //   packageChoice: this.editUserForm.get('packageChoice').value || this.user.packageChoice,
    //   email:  this.editUserForm.get('email').value || this.user.email,
    //   specialist: this.selectedSpecialist || this.user.specialist,
    //   photoURL: this.downloadURL || this.user.photoURL,
    //   basicData: {
    //     gender: this.selectedGender || this.user.basicData.gender,
    //     country: this.editUserForm.get('country').value || this.user.basicData.country,
    //     age: this.editUserForm.get('age').value || this.user.basicData.age,
    //     mainGoal: this.editUserForm.get('mainGoal').value || this.user.basicData.mainGoal,
    //     phoneNumber:  this.editUserForm.get('phoneNumber').value || this.user.basicData.phoneNumber,
    //   }
    // };
    // this.packageService.updatePackage(this.package.packageID, data);
    // this.toggleEdit();
  }

  receiveDownloadURL($event) {
    return this.downloadURL = $event;
  }

    // Back Button

    goBack() {
      return this.location.back();
    }

}
