import { Component, OnInit, Inject, ViewEncapsulation, HostListener, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';

// Services
import { AuthService } from '../../../core/auth/auth.service';
import { UserService } from '../../../user/user.service';
import { FoodService } from '../../../foods/food.service';
import { MealplanService } from '../../../mealplans/mealplan.service';
import { EditMealDialogService } from './edit-meal-dialog.service';
import { Observable } from 'rxjs';

// Data
import { MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../../../user/user.model';
import { Time } from '../../data/models/time.model';
import { Food } from '../../../foods/food.model';
import { DayForm } from './../add-meal-dialog/day-form.model';
import times from '../../data/JSON/times.json';
import mealTimes from '../../data/JSON/mealTimes.json';
import { Specialist } from '../../../specialists/specialist.model';
import { SpecialistService } from '../../../specialists/specialist.service';
import { SuppsForm } from '../add-meal-dialog/supps-form.model';
import { Mealplan } from './../../../mealplans/mealplan.model';
import { EditWednesdayFormComponent } from './edit-wednesday-form/edit-wednesday-form.component';
import { EditMondayFormComponent } from './edit-monday-form/edit-monday-form.component';
import { EditTuesdayFormComponent } from './edit-tuesday-form/edit-tuesday-form.component';
import { EditThursdayFormComponent } from './edit-thursday-form/edit-thursday-form.component';
import { EditFridayFormComponent } from './edit-friday-form/edit-friday-form.component';
import { EditSuppsFormComponent } from './edit-supps-form/edit-supps-form.component';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'app-edit-meal-dialog',
  templateUrl: './edit-meal-dialog.component.html',
  styleUrls: ['./edit-meal-dialog.component.scss'],
})
export class EditMealDialogComponent implements OnInit {
  // Child components
  @ViewChild(EditMondayFormComponent) mondayComp: EditMondayFormComponent;
  @ViewChild(EditTuesdayFormComponent) tuesdayComp: EditTuesdayFormComponent;
  @ViewChild(EditWednesdayFormComponent) wednesdayComp: EditThursdayFormComponent;
  @ViewChild(EditThursdayFormComponent) thursdayComp: EditWednesdayFormComponent;
  @ViewChild(EditFridayFormComponent) fridayComp: EditFridayFormComponent;
  @ViewChild(EditSuppsFormComponent) suppsComp: EditSuppsFormComponent;

  // Values for storing data
  client: User;
  clients: Observable<User[]>;
  specialistID;
  specialist: Specialist;
  mealplan: Mealplan;

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
               public editMealService: EditMealDialogService,
               public dialog: MatDialog,
               private dialogRef: MatDialogRef<EditMealDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any) {
                this.foodService.getFoods().subscribe(foods => this.foods = foods);
                this.userService.getUserDataByID(this.data.mealplan.clientID).subscribe(client => this.client = client);
                this.mealplan = this.data.mealplan;
               }

  ngOnInit() {
    // Init forms
    this.infoForm = this.fb.group({
      mealplanName: [`${this.data.mealplan.mealplanName}`, [Validators.required]],
      clientID: [`${this.data.mealplan.clientID}`]
    });

    this.mealTimeForm = this.fb.group({
      mealTimeArr: this.fb.array([]),
    });

    this.userService.getUserDataByID(this.auth.currentUserId).subscribe(user => {
      this.specialistID = user.uid;
      const sID =  user.specialist;
      this.getSpecialist(sID);

      const myClientsCol: AngularFirestoreCollection<User> =
        this.afs.collection('users', ref => ref.where('specialist', '==', `${sID}`));
      this.clients = myClientsCol.valueChanges();
    });
    // this.userService.getUserDataByID(this.mealplan.clientID).subscribe(user => this.client = user);

    // Subscribe to Form day Objects
    this.editMealService.mondayFormChange.subscribe(obj => this.mondayMeals = obj);
    this.editMealService.tuesdayFormChange.subscribe(obj => this.tuesdayMeals = obj);
    this.editMealService.wednesdayFormChange.subscribe(obj => this.wednesdayMeals = obj);
    this.editMealService.thursdayFormChange.subscribe(obj => this.thursdayMeals = obj);
    this.editMealService.fridayFormChange.subscribe(obj => this.fridayMeals = obj);
    this.editMealService.suppsFormChange.subscribe(obj => this.supps = obj);

    // Fill arrays and objects
    this.loadForm(this.data.mealplan);
  }

  // Save items on step change
  onStepChange(e) {
    this.mondayComp.updateData();
    this.tuesdayComp.updateData();
    this.wednesdayComp.updateData();
    this.thursdayComp.updateData();
    this.fridayComp.updateData();
    this.suppsComp.updateData();
  }


  // MealTime form
  get mealTimeForms() {
    return this.mealTimeForm.get('mealTimeArr') as FormArray;
  }

  loadForm(data) {
    this.mealTimeArr = this.mealTimeForm.get('mealTimeArr') as FormArray;
    const amountOfMealTimes = data.mealTimes;
    amountOfMealTimes.forEach(time => {
      this.mealTimeArr.push(this.createMealTime(time));
    });
  }

  createMealTime(data): FormGroup {
    return this.fb.group({
      mealTime: `${data.mealTime}`,
      mealTimeName: `${data.mealTimeName}`,
    });
  }

  createNewMealTime(): FormGroup {
    return this.fb.group({
      mealTime: '',
      mealTimeName: '',
    });
  }

  addMealTime(): void {
    this.mealTimeArr = this.mealTimeForm.get('mealTimeArr') as FormArray;
    this.mealTimeArr.push(this.createNewMealTime());
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

  updateClient(e) {
    this.client = e.value;
    this.suppsComp.getGuidelines(this.client.uid);
    this.suppsComp.resetForm();
  }

  // Getters

  getSpecialist(sID: string) {
    this.specialistService.getSpecialistData(sID).subscribe(specialist => (this.specialist = specialist));
  }


  // Collect the data and send to service
  updateMealplan() {
    const mID: string = this.data.mealplan.mID;
    const data = {
      clientID: this.client.uid || this.infoForm.get('clientID').value || this.data.mealplan.clientID,
      specialistID: this.specialistID,
      specialistName: this.specialist.firstName + ' ' + this.specialist.lastName,
      lastEdited: new Date(),
      mID: this.data.mealplan.mID,
      mealplanNR: this.data.mealplan.mealplanNR,
      mealplanName: this.infoForm.get('mealplanName').value,
      mealTimes: this.mealTimeForms.value,
      mondayMeals: this.mondayMeals || this.mealplan.mondayMeals,
      tuesdayMeals: this.tuesdayMeals || this.mealplan.tuesdayMeals,
      wednesdayMeals: this.wednesdayMeals || this.mealplan.wednesdayMeals,
      thursdayMeals: this.thursdayMeals || this.mealplan.thursdayMeals,
      fridayMeals: this.fridayMeals || this.mealplan.fridayMeals,
      supplementation: this.supps || this.mealplan.supplementation
    };
    this.mealplanService.updateMealplan(mID, data);
    this.dialog.closeAll();
  }

  closeDialog() {
    if (confirm('Are you sure you want to stop editing this mealplan? Changes will be lost')) {
      this.dialog.closeAll();
    }
  }
}
