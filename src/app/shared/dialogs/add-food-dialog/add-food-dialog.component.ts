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
  selector: 'app-add-food-dialog',
  templateUrl: './add-food-dialog.component.html',
  styleUrls: ['./add-food-dialog.component.scss']
})
export class AddFoodDialogComponent implements OnInit {

  hide = true;
  // FormGroups
  addFoodForm: FormGroup;
  infoForm: FormGroup;
  categoryForm: FormGroup;
  prepForm: FormGroup;
  portionForm: FormGroup;

  prepArr: FormArray;
  prepValue = new FormControl('', [Validators.required]);


  constructor( private fb: FormBuilder,
               private foodService: FoodService) {}

  ngOnInit() {
    this.infoForm = this.fb.group({
      productID: ['', [Validators.required]],
      productName: ['', [Validators.required]],
    });

    this.categoryForm = this.fb.group({
      productCategory: ['', [Validators.required]],
    });

    this.prepForm = this.fb.group({
      prepArr: this.fb.array([ this.createPrep() ]),
    });

    this.portionForm = this.fb.group({
      amount: ['', [Validators.required]],
      unit: ['', [Validators.required]],
    });
  }


  // Getters
  get prepForms() {
    return this.prepForm.get('prepArr') as FormArray;
  }

    // Create a new Package prep Mat Card
    createPrep(): FormGroup {
      return this.fb.group({
        prepValue: ''
      });
    }

    addPrep(): void {
      this.prepArr = this.prepForm.get('prepArr') as FormArray;
      this.prepArr.push(this.createPrep());
    }

    deletePrep(i) {
      (this.prepForm.get('prepArr') as FormArray).removeAt(i);
    }

    addFood() {
      const data = {
        productID: this.infoForm.get('productID').value,
        productName: this.infoForm.get('productName').value,
        productCategory: this.categoryForm.get('productCategory').value,
        portion: this.portionForm.value,
        preperations: this.prepForms.value,
      };
      this.foodService.addFood(data);
    }
}
