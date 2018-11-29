import { Component, OnInit } from '@angular/core';
import { Package } from './../package.model';
import { PackageService } from '../package.service';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.scss']
})
export class AddPackageComponent implements OnInit {
  addPackageForm: FormGroup;
  packageBenefits: FormArray;
  benefitValue = new FormControl('', [Validators.required]);

  constructor( private packageService: PackageService,
               private fb: FormBuilder) { }

  ngOnInit() {
    this.addPackageForm = this.fb.group({
      packageID: ['', [Validators.required]],
      packageTitle: ['', [Validators.required]],
      packageDescription: ['', [Validators.required]],
      packagePrice: ['', [Validators.required]],
      packageDuration: ['', [Validators.required]],
      packageBenefits: this.fb.array([ this.createBenefit() ]),
    });
  }

  get benefitForms() {
    return this.addPackageForm.get('packageBenefits') as FormArray;
  }

  sendPackageData() {
    const data = this.addPackageForm.value;
    this.packageService.addPackage(data);
    this.addPackageForm.reset();
  }

    // Create a new Package benefit Mat Card
    createBenefit(): FormGroup {
      return this.fb.group({
        benefitValue: '',
      });
    }

    addBenefit(): void {
      this.packageBenefits = this.addPackageForm.get('packageBenefits') as FormArray;
      this.packageBenefits.push(this.createBenefit());
    }

    deleteBenefit(i) {
      (this.addPackageForm.get('packageBenefits') as FormArray).removeAt(i);
    }

}
