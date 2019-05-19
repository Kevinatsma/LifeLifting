import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { PackageService } from './../package.service';
import { Location } from '@angular/common';
import { SpecialistService } from './../../specialists/specialist.service';
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
  editPackageForm: FormGroup;


  constructor( private fb: FormBuilder,
               private packageService: PackageService,
               public specialistService: SpecialistService,
               public location: Location) {
               }

  ngOnInit() {
    this.editPackageForm = this.fb.group({
      packageTitle: '' || this.package.packageTitle,
      packageDescription: '' || this.package.packageDescription,
      packageDuration: '' || this.package.packageDuration,
      packagePrice: '' || this.package.packagePrice,
    });
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

  editPackage() {
    const data = {
      packageTitle: this.editPackageForm.get('packageTitle').value || this.package.packageTitle,
      packageDescription: this.editPackageForm.get('packageDescription').value || this.package.packageDescription,
      packageDuration:  this.editPackageForm.get('packageDuration').value || this.package.packageDuration,
      packagePrice: this.editPackageForm.get('packagePrice').value || this.package.packagePrice,
    };
    this.packageService.updatePackage(this.package.packageID, data);
    this.toggleEdit();
  }

    // Back Button

    goBack() {
      return this.location.back();
    }

}
