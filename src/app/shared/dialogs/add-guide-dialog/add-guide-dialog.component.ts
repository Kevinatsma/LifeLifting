import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { GuidelineService } from '../../../guidelines/guideline.service';
import { MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { User } from './../../../user/user.model';
import { AuthService } from './../../../core/auth/auth.service';
import { UserService } from './../../../user/user.service';

@Component({
  selector: 'app-add-guide-dialog',
  templateUrl: './add-guide-dialog.component.html',
  styleUrls: ['./add-guide-dialog.component.scss']
})
export class AddGuideDialogComponent implements OnInit {
  user = User;
  specialistID;
  hide = true;
  // FormGroups
  addGuidelineForm: FormGroup;
  infoForm: FormGroup;
  categoryForm: FormGroup;
  prepForm: FormGroup;
  portionForm: FormGroup;
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
               private auth: AuthService,
               private userService: UserService,
               private guidelineService: GuidelineService,
               public matDialog: MatDialog,
               @Inject(MAT_DIALOG_DATA) public userData: any) {
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
    this.userService.getUserDataByID(this.auth.currentUserId).subscribe(user => {
      this.specialistID = user.uid;
      console.log(this.specialistID);
    });
    // this.userService.getUserDataByID(this.guideline.clientID).subscribe(user => this.client = user);
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

    addGuideline() {
      const data = {
        clientID: this.userData.uid,
        creationDate: new Date(),
        specialistID: this.specialistID,
        productID: this.userData.uid + '_' + this.infoForm.get('productID').value,
        productNR: this.infoForm.get('productID').value,
        productName: this.infoForm.get('productName').value,
        productCategory: this.categoryForm.get('productCategory').value,
        portion: this.portionForm.value,
        preperations: this.prepForms.value,
      };
      const uid = this.userData.uid;
      this.guidelineService.addGuideline(data, uid);
    }
}
