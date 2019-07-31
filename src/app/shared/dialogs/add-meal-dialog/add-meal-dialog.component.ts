import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';

// Services
import { AuthService } from '../../../core/auth/auth.service';
import { UserService } from '../../../user/user.service';
import { FoodService } from './../../../foods/food.service';
import { MealplanService } from '../../../mealplans/mealplan.service';
import { AddMealDialogService } from './add-meal-dialog.service';
import { Observable } from 'rxjs';

// Data
import { MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../../../user/user.model';
import { Time } from '../../data/models/time.model';
import { Food } from './../../../foods/food.model';
import { DayForm } from './day-form.model';
import times from './../../data/JSON/times.json';
import mealTimes from './../../data/JSON/mealTimes.json';
import { Specialist } from './../../../specialists/specialist.model';
import { SpecialistService } from './../../../specialists/specialist.service';
import { SuppsForm } from './supps-form.model';
import { Mealplan } from './../../../mealplans/mealplan.model';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-add-meal-dialog',
  templateUrl: './add-meal-dialog.component.html',
  styleUrls: ['./add-meal-dialog.component.scss', './../edit-meal-dialog/edit-meal-dialog.component.scss']
})
export class AddMealDialogComponent implements OnInit {
  // Values for storing data
  user = User;
  specialistID;
  specialist: Specialist;
  mealplans: Mealplan[];

  // FormGroups
  infoForm: FormGroup;
  // MealTimes get shared with child forms
  mealTimeForm: FormGroup;
  mealTimeArr: FormArray;

  // Day forms, these get changed by events emitted from the child components
  mondayMeals: Observable<DayForm>;
  tuesdayMeals: Observable<DayForm>;
  wednesdayMeals: Observable<DayForm>;
  thursdayMeals: Observable<DayForm>;
  fridayMeals: Observable<DayForm>;
  supps: Observable<SuppsForm>;
  exercises: Observable<{}>;

  // Select value loops - retreive from json/firestore
  mealTimeNames = mealTimes.mealTimes;
  times: Time[] = times.times;
  foods: Food[];
  selectedProduct: Food;

  // Hide/show booleans
  showAddMealTime = true;

  // Disable popup from closing
  @HostListener('window:keyup.esc') onKeyUp() {
    event.preventDefault();
    if (confirm('Are you sure you want to quit creating this mealplan? Your progress will be lost.')) {
      this.dialog.closeAll();
    }
  }

  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
      event.returnValue = false;
  }

  constructor( private fb: FormBuilder,
               private afs: AngularFirestore,
               private auth: AuthService,
               private userService: UserService,
               private foodService: FoodService,
               private specialistService: SpecialistService,
               private mealplanService: MealplanService,
               public mealService: AddMealDialogService,
               public dialog: MatDialog,
               @Inject(MAT_DIALOG_DATA) public userData: any) {
                this.foodService.getFoods().subscribe(foods => this.foods = foods);
                setTimeout(() => this.getMealplans(), 500);
               }

  ngOnInit() {
    // Init forms
    this.infoForm = this.fb.group({
      mID: ['', [Validators.required]],
      mealplanName: ['', [Validators.required]],
      extraNotes: ['']
    });

    this.mealTimeForm = this.fb.group({
      mealTimeArr: this.fb.array([ this.createMealTime(), this.createMealTime(), this.createMealTime() ]),
    });

    this.userService.getUserDataByID(this.auth.currentUserId).subscribe(user => {
      this.specialistID = user.uid;
      const sID =  user.specialist;
      this.getSpecialist(sID);
    });
    // this.userService.getUserDataByID(this.mealplan.clientID).subscribe(user => this.client = user);

    // Subscribe to Form day Objects
    this.mealService.mondayFormChange.subscribe(obj => this.mondayMeals = obj);
    this.mealService.tuesdayFormChange.subscribe(obj => this.tuesdayMeals = obj);
    this.mealService.wednesdayFormChange.subscribe(obj => this.wednesdayMeals = obj);
    this.mealService.thursdayFormChange.subscribe(obj => this.thursdayMeals = obj);
    this.mealService.fridayFormChange.subscribe(obj => this.fridayMeals = obj);
    this.mealService.suppsFormChange.subscribe(obj => this.supps = obj);
  }

  // MealTime form
  get mealTimeForms() {
    return this.mealTimeForm.get('mealTimeArr') as FormArray;
  }

  createMealTime(): FormGroup {
    return this.fb.group({
      mealTime: '',
      mealTimeName: '',
    });
  }

  addMealTime(): void {
    this.mealTimeArr = this.mealTimeForm.get('mealTimeArr') as FormArray;
    this.mealTimeArr.push(this.createMealTime());
  }

  checkMealTime(): void {
    if (this.mealTimeArr.length < 7) {
      this.showAddMealTime = true;
    } else {
      this.showAddMealTime = false;
    }
  }

  deleteMealTime(i) {
    (this.mealTimeForm.get('mealTimeArr') as FormArray).removeAt(i);
  }

  updateMealTimes() {
    this.mealTimeArr = this.mealTimeForm.get('mealTimeArr') as FormArray;
  }

  // Getters

  getSpecialist(sID: string) {
    this.specialistService.getSpecialistData(sID).subscribe(specialist => (this.specialist = specialist));
  }

  getMealplans() {
    const colRef = this.afs.collection('mealplans', ref => ref.where('clientID', '==',  `${this.userData.uid}`));
    this.mealplanService.queryMealplans(colRef).subscribe(mealplans => {
      this.mealplans = mealplans;
      this.patchForm(this.mealplans);
    });
  }

  // Patch form
  patchForm(mealplans) {
    const mealplanNumber = mealplans.length + 1;
    this.infoForm.get('mID').patchValue(mealplanNumber);
  }

  // Collect the data and send to service
  addMealplan() {
    const data = {
      clientID: this.userData.uid,
      specialistID: this.specialistID,
      specialistName: this.specialist.firstName + ' ' + this.specialist.lastName,
      creationDate: new Date(),
      mealplanNR: this.infoForm.get('mID').value,
      mealplanName: this.infoForm.get('mealplanName').value,
      mealTimes: this.mealTimeForms.value,
      mondayMeals: this.mondayMeals,
      tuesdayMeals: this.tuesdayMeals,
      wednesdayMeals: this.wednesdayMeals,
      thursdayMeals: this.thursdayMeals,
      fridayMeals: this.fridayMeals,
      supplementation: this.supps,
      extraNotes: this.infoForm.get('extraNotes').value
    };
    this.mealplanService.addMealplan(data);
  }

  closeDialog() {
    if (confirm('Are you sure you want to stop editing this mealplan?')) {
      this.dialog.closeAll();
    }
  }
}
