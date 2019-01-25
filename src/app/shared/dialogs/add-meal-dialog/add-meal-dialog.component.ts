import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FoodService } from '../../../foods/food.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-meal-dialog',
  templateUrl: './add-meal-dialog.component.html',
  styleUrls: ['./add-meal-dialog.component.scss']
})
export class AddMealDialogComponent implements OnInit {

  hide = true;
  // FormGroups
  addFoodForm: FormGroup;
  infoForm: FormGroup;
  categoryForm: FormGroup;
  prepForm: FormGroup;
  portionForm: FormGroup;

  downloadURL: string | null;
  prepArr: FormArray;
  prepValue = new FormControl('', [Validators.required]);


  preperations = [
    {
      prepValue: 'Cooked',
    },
    {
      prepValue: 'Cooked w/Spinach',
    },
    {
      prepValue: 'Sauteed w/Veggies',
    },
    {
      prepValue: 'Chopped',
    },
    {
      prepValue: 'Sliced',
    },
    {
      prepValue: 'Diced',
    },
    {
      prepValue: 'Raw',
    },
    {
      prepValue: 'Snacked',
    },
    {
      prepValue: 'Hard Boiled',
    },
    {
      prepValue: 'Omelette',
    },
    {
      prepValue: 'Scrambled',
    },
    {
      prepValue: 'Grated',
    },
    {
      prepValue: 'Whole',
    },
  ];

  constructor( private fb: FormBuilder,
               private foodService: FoodService,
               public matDialog: MatDialog,
               @Inject(MAT_DIALOG_DATA) public userData: any) {
                 alert(userData.uid);
               }

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

  receiveDownloadURL($event) {
    return this.downloadURL = $event;
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
        productPhoto: this.downloadURL,
        productCategory: this.categoryForm.get('productCategory').value,
        portion: this.portionForm.value,
        preperations: this.prepForms.value,
      };
      const uid = this.userData.uid;
      this.foodService.addFood(data);
    }
}
