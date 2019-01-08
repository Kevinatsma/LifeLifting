import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SpecialistService } from '../../../specialists/specialist.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { DataService } from 'src/app/shared/data/data.service';
import { Timezone } from 'src/app/shared/data/models/timezone.model';
import { Country } from '../../data/models/country.model';
import languages from '../../data/JSON/languages.json';
import { Language } from '../../data/models/language.model';
import { FoodService } from 'src/app/foods/food.service';

@Component({
  selector: 'app-add-package-dialog',
  templateUrl: './add-package-dialog.component.html',
  styleUrls: ['./add-package-dialog.component.scss']
})
export class AddFoodDialogComponent implements OnInit {

  hide = true;
  // FormGroups
  addPackageForm: FormGroup;
  personalForm: FormGroup;
  aboutForm: FormGroup;
  timeForm: FormGroup;
  priceForm: FormGroup;
  extrasForm: FormGroup;

  benefitArr: FormArray;
  benefitValue = new FormControl('', [Validators.required]);


  constructor( private fb: FormBuilder,
               private foodService: FoodService) {}

  ngOnInit() {
    this.personalForm = this.fb.group({
      packageID: ['', [Validators.required]],
      packageTitle: ['', [Validators.required]],
    });

    this.aboutForm = this.fb.group({
      packageDescription: ['', [Validators.required]],
    });

    this.timeForm = this.fb.group({
      packageDuration: ['', [Validators.required]],
    });

    this.priceForm = this.fb.group({
      packagePrice: ['', [Validators.required]],
    });

    this.extrasForm = this.fb.group({
      benefitArr: this.fb.array([ this.createBenefit() ]),
    });
  }


  // Getters
  get benefitForms() {
    return this.extrasForm.get('benefitArr') as FormArray;
  }

    // Create a new Package benefit Mat Card
    createBenefit(): FormGroup {
      return this.fb.group({
        benefitValue: ''
      });
    }

    addBenefit(): void {
      this.benefitArr = this.extrasForm.get('benefitArr') as FormArray;
      this.benefitArr.push(this.createBenefit());
    }

    deleteBenefit(i) {
      (this.extrasForm.get('benefitArr') as FormArray).removeAt(i);
    }

    addPackage() {
      const data = {
        packageID: this.personalForm.get('packageID').value,
        packageTitle: this.personalForm.get('packageTitle').value,
        packageDescription: this.aboutForm.get('packageDescription').value,
        packageDuration: this.timeForm.get('packageDuration').value,
        packagePrice: this.priceForm.get('packagePrice').value,
        packageBenefits: this.benefitForms.value,
      };
      this.foodService.addPackage(data);
    }
}
