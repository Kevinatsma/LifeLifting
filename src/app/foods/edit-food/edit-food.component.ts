import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { User } from '../../user/user.model';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { FoodService } from './../food.service';
import { Observable } from 'rxjs';
import { Timezone } from 'src/app/shared/data/models/timezone.model';
import { DataService } from 'src/app/shared/data/data.service';
import { Location } from '@angular/common';
import { SpecialistService } from 'src/app/specialists/specialist.service';
import { Specialist } from 'src/app/specialists/specialist.model';
import { Food } from '../food.model';

@Component({
  selector: 'app-edit-food',
  templateUrl: './edit-food.component.html',
  styleUrls: ['./../food-detail/food-detail.component.scss', './edit-food.component.scss']
})
export class EditFoodComponent implements OnInit, OnDestroy {
  @Input() food: Food;
  aboutExtended = false;
  reviewsVisible = true;

  // Form
  editPackageForm: FormGroup;


  constructor( private fb: FormBuilder,
               private foodService: FoodService,
               public specialistService: SpecialistService,
               public location: Location) {
               }

  ngOnInit() {
    this.editPackageForm = this.fb.group({
      packageTitle: '' || this.food.packageTitle,
      packageDescription: '' || this.food.packageDescription,
      packageDuration: '' || this.food.packageDuration,
      packagePrice: '' || this.food.packagePrice,
    });
  }

  // Getters

  get editShow(): boolean {
    return this.foodService.editShow;
  }

  toggleEdit() {
      this.foodService.toggleEdit();
  }

  ngOnDestroy() {
    this.foodService.editShow = false;
  }

  editPackage() {
    const data = {
      packageTitle: this.editPackageForm.get('packageTitle').value || this.food.packageTitle,
      packageDescription: this.editPackageForm.get('packageDescription').value || this.food.packageDescription,
      packageDuration:  this.editPackageForm.get('packageDuration').value || this.food.packageDuration,
      packagePrice: this.editPackageForm.get('packagePrice').value || this.food.packagePrice,
    };
    this.foodService.updatePackage(this.food.packageID, data);
    this.toggleEdit();
  }

    // Back Button

    goBack() {
      return this.location.back();
    }

}
