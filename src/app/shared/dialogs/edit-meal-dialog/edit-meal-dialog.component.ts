import { Component, OnInit, Inject, HostListener, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Services
import { AuthService } from '../../../core/auth/auth.service';
import { UserService } from '../../../user/user.service';
import { FoodService } from '../../../foods/food.service';
import { MealplanService } from '../../../mealplans/mealplan.service';
import { EditMealDialogService } from './edit-meal-dialog.service';
import { Observable, Subscription } from 'rxjs';

// Data
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
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-edit-meal-dialog',
  templateUrl: './edit-meal-dialog.component.html',
  styleUrls: ['./edit-meal-dialog.component.scss'],
})
export class EditMealDialogComponent implements OnInit, OnDestroy {
  // Child components
  @ViewChild(EditMondayFormComponent) mondayComp: EditMondayFormComponent;
  @ViewChild(EditTuesdayFormComponent) tuesdayComp: EditTuesdayFormComponent;
  @ViewChild(EditWednesdayFormComponent) wednesdayComp: EditThursdayFormComponent;
  @ViewChild(EditThursdayFormComponent) thursdayComp: EditWednesdayFormComponent;
  @ViewChild(EditFridayFormComponent) fridayComp: EditFridayFormComponent;
  @ViewChild(EditSuppsFormComponent) suppsComp: EditSuppsFormComponent;

  // Values for storing data
  client: User;
  client$: Subscription;
  clients: Observable<User[]>;
  specialistID;
  specialistID$: Subscription;
  specialist: Specialist;
  specialist$: Subscription;
  mealplan: Mealplan;

  // FormGroups
  infoForm: FormGroup;
  // MealTimes get shared with child forms
  mealTimeForm: FormGroup;
  mealTimeArr: FormArray;

  // Day forms, these get changed by events emitted from the child components
  mondayMeals: Observable<DayForm>;
  monday$: Subscription;
  tuesdayMeals: Observable<DayForm>;
  tuesday$: Subscription;
  wednesdayMeals: Observable<DayForm>;
  wednesday$: Subscription;
  thursdayMeals: Observable<DayForm>;
  thursday$: Subscription;
  fridayMeals: Observable<DayForm>;
  friday$: Subscription;
  supps: Observable<SuppsForm>;
  supps$: Subscription;
  exercises: Observable<{}>;
  foods$: Subscription;

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
                this.foods$ = this.foodService.getFoods().subscribe(foods => this.foods = foods);
                this.client$ = this.userService.getUserDataByID(this.data.mealplan.clientID).subscribe(client => this.client = client);
                this.mealplan = this.data.mealplan;
               }

  ngOnInit() {
    // Init forms
    this.infoForm = this.fb.group({
      mealplanName: [`${this.data.mealplan.mealplanName}`, [Validators.required]],
      clientID: [`${this.data.mealplan.clientID}`],
      extraNotes: [`${this.data.mealplan.extraNotes}` || '']
    });

    this.mealTimeForm = this.fb.group({
      mealTimeArr: this.fb.array([]),
    });

    this.specialistID$ = this.userService.getUserDataByID(this.auth.currentUserId).subscribe(user => {
      this.specialistID = user.uid;
      const sID =  user.specialist;
      this.getSpecialist(sID);

      const myClientsCol: AngularFirestoreCollection<User> =
        this.afs.collection('users', ref => ref.where('specialist', '==', `${sID}`));
      this.clients = myClientsCol.valueChanges();
    });

    // Subscribe to Form day Objects
    this.monday$ = this.editMealService.mondayFormChange.subscribe(obj => this.mondayMeals = obj);
    this.tuesday$ = this.editMealService.tuesdayFormChange.subscribe(obj => this.tuesdayMeals = obj);
    this.wednesday$ = this.editMealService.wednesdayFormChange.subscribe(obj => this.wednesdayMeals = obj);
    this.thursday$ = this.editMealService.thursdayFormChange.subscribe(obj => this.thursdayMeals = obj);
    this.friday$ = this.editMealService.fridayFormChange.subscribe(obj => this.fridayMeals = obj);
    this.supps$ = this.editMealService.suppsFormChange.subscribe(obj => this.supps = obj);

    // Fill arrays and objects
    this.loadForm(this.data.mealplan);
  }

  ngOnDestroy() {
    this.foods$.unsubscribe();
    this.monday$.unsubscribe();
    this.tuesday$.unsubscribe();
    this.wednesday$.unsubscribe();
    this.thursday$.unsubscribe();
    this.friday$.unsubscribe();
    this.supps$.unsubscribe();
    this.specialistID$.unsubscribe();
    if (this.specialist$ !== undefined) { this.specialist$.unsubscribe(); }
    this.client$.unsubscribe();
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
    this.specialist$ = this.specialistService.getSpecialistData(sID).subscribe(specialist => (this.specialist = specialist));
  }


  // Collect the data and send to service
  updateMealplan() {
    const mID: string = this.data.mealplan.mID;
    const data = {
      clientID: this.client.uid || this.infoForm.get('clientID').value || this.data.mealplan.clientID,
      specialistID: this.specialistID,
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
      supplementation: this.supps,
      extraNotes: this.infoForm.get('extraNotes').value
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
