import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../../user/user.model';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { FirstConsultationService } from '../first-consultation.service';
import { Mealplan } from '../../mealplans/mealplan.model';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-add-first-consultation',
  templateUrl: './add-first-consultation.component.html',
  styleUrls: ['./add-first-consultation.component.scss']
})
export class AddFirstConsultationComponent implements OnInit {
  client: User;
  mealplans: Mealplan[];
  mealplansCol: AngularFirestoreCollection<Mealplan>;

  // Form
  basicDataForm: FormGroup;
  habitForm: FormGroup;
  bodyFunctionsForm: FormGroup;
  generalDataForm: FormGroup;
  noteForm: FormGroup;

  // Form Arrays
  healthConditionsArr: FormArray;
  pastTwoWeeksArr: FormArray;
  dontEatArr: FormArray;
  shoppingLocationArr: FormArray;
  activityArr: FormArray;
  hungryScale: string;

  // Disable popup from closing
  @HostListener('window:keyup.esc') onKeyUp() {
    event.preventDefault();
    if (confirm('Are you sure you want to quit creating this first consultation? Your progress will be lost.')) {
      this.dialog.closeAll();
    }
  }

  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
      event.returnValue = false;
  }

  constructor( private afs: AngularFirestore,
               private fb: FormBuilder,
               private firstConsultationService: FirstConsultationService,
               public dialog: MatDialog,
               @Inject(MAT_DIALOG_DATA) public data: any) {
     this.client = data.client;
  }

  ngOnInit() {
    this.basicDataForm = this.fb.group({
      mealplanMainGoal: ['', Validators.required],
      sex: ['', Validators.required],
      birthDate: ['', Validators.required],
      age: ['', Validators.required],
      height: ['', Validators.required],
      phoneAreaCode: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
    });
    this.habitForm = this.fb.group({
      alcohol: ['', Validators.required],
      alcoholNote: [''],
      smoke: ['', Validators.required],
      smokeNote: [''],
      drugs: ['', Validators.required],
      coffee: ['', Validators.required],
      coffeeNote: [''],
      tea: ['', Validators.required],
      teaNote: [''],
      socialLife: ['', Validators.required],
      socialLifeNote: [''],
      stayUpLate: ['', Validators.required],
      stayUpLateNote: [''],
      wakeUpTime: ['', Validators.required],
      sleepTime: ['', Validators.required],
      breakfastTime: ['', Validators.required],
      lunchTime: ['', Validators.required],
      dinnerTime: ['', Validators.required],
      whoCooks: ['', Validators.required],
      breakfastAtHome: ['', Validators.required],
      breakfastAtHomeNote: ['', Validators.required],
      description: ['', Validators.required],
      schedule: ['', Validators.required],
      workOnWeekends: ['', Validators.required],
      workOnWeekendsNote: [''],
      homeToWork: ['', Validators.required],
      workToHome: ['', Validators.required],
      transportationMethod: ['', Validators.required],
      eatDuringJob: ['', Validators.required],
      practicalSnackDuringJob: ['', Validators.required],
      snacksPreference: ['', Validators.required],
      kitchenGadgetsAtWork: ['', Validators.required]
    });
    this.bodyFunctionsForm = this.fb.group({
      urinateAmount: ['', Validators.required],
      middleNightUrinate: ['', Validators.required],
      everyDay: ['', Validators.required],
      mealplanID: ['', Validators.required],
      everyDayAmount: [''],
      timesPerDay: ['', Validators.required],
      sameSchedule: ['', Validators.required],
      hungryScale: ['', Validators.required],
      mostHungryMoment: ['', Validators.required],
      sleepingStatus: ['', Validators.required],
      averageHours: ['', Validators.required],
      troubleFallingAsleep: ['', Validators.required],
      wakeUpEnergized: ['', Validators.required],
    });
    this.generalDataForm = this.fb.group({
      healthConditions: this.fb.array([ this.createHealthCondition() ]),
      gastritis: ['', Validators.required],
      medication: ['', Validators.required],
      pastTwoWeeks: this.fb.array([ this.createPastTwoWeeks() ]),
      dontEat: this.fb.array([ this.createDontEatItem() ]),
      portion: ['', Validators.required],
      preparedBy: ['', Validators.required],
      eatAfterDinner: ['', Validators.required],
      shoppingLocation: this.fb.array([ this.createShoppingLocation() ]),
      whoBuys: ['', Validators.required],
      orderOnline: ['', Validators.required],
      physicalActivitiesConfirmation: ['', Validators.required],
      physicalActivities: this.fb.array([ this.createActivity() ]),
      physicalActivitiesWhy: [''],
      workoutSchedule: ['', Validators.required],
      trainingLocation: ['', Validators.required],
      travelTime: ['', Validators.required],
      trainingIntensity: ['', Validators.required],
      wakeUpTime: ['', Validators.required],
      orderFood: ['', Validators.required],
      orderFoodNote: [''],
      supplements: ['', Validators.required],
      supplementNote: [''],
      willingToUseSupps: ['', Validators.required],
      eatingRecordatory: ['', Validators.required],
    });
    this.noteForm = this.fb.group({
      specialistNotes: [''],
    });
  }

  // Getters
  get healthConditionsArray() {
    return this.generalDataForm.get('healthConditions') as FormArray;
  }
  get pastTwoWeeksArray() {
    return this.generalDataForm.get('pastTwoWeeks') as FormArray;
  }
  get dontEatArray() {
    return this.generalDataForm.get('dontEat') as FormArray;
  }
  get shoppingLocationArray() {
    return this.generalDataForm.get('shoppingLocation') as FormArray;
  }
  get activityArray() {
    return this.generalDataForm.get('physicalActivities') as FormArray;
  }

  // Create, add, delete form array items
  createHealthCondition(): FormGroup {
    return this.fb.group({
      healthCondition: ''
    });
  }

  createPastTwoWeeks(): FormGroup {
    return this.fb.group({
      pastTwoWeeks: ''
    });
  }

  createDontEatItem(): FormGroup {
    return this.fb.group({
      dontEat: ''
    });
  }

  createShoppingLocation(): FormGroup {
    return this.fb.group({
      shopppingLocation: ''
    });
  }

  createActivity(): FormGroup {
    return this.fb.group({
      activity: ''
    });
  }

  addHealthCondition(): void {
    this.healthConditionsArr = this.generalDataForm.get('healthConditions') as FormArray;
    this.healthConditionsArr.push(this.createHealthCondition());
  }

  addPastTwoWeeks(): void {
    this.pastTwoWeeksArr = this.generalDataForm.get('healthConditions') as FormArray;
    this.pastTwoWeeksArr.push(this.createHealthCondition());
  }

  addDontEatItem(): void {
    this.dontEatArr = this.generalDataForm.get('healthConditions') as FormArray;
    this.dontEatArr.push(this.createHealthCondition());
  }

  addShoppingLocation(): void {
    this.shoppingLocationArr = this.generalDataForm.get('healthConditions') as FormArray;
    this.shoppingLocationArr.push(this.createHealthCondition());
  }

  addActivity(): void {
    this.activityArr = this.generalDataForm.get('healthConditions') as FormArray;
    this.activityArr.push(this.createHealthCondition());
  }

  deleteHealthCondition(i) {
    (this.generalDataForm.get('healthConditionsArray') as FormArray).removeAt(i);
  }


  // Upload results
  addFirstConsultation() {
    const basicData = {
      mealplanMainGoal: this.basicDataForm.get('mealplanMainGoal').value,
      sex: this.basicDataForm.get('sex').value,
      birthDate: this.basicDataForm.get('birthDate').value,
      age: this.basicDataForm.get('age').value,
      height: this.basicDataForm.get('height').value,
      phoneNumber: this.basicDataForm.get('phoneAreaCode').value + this.basicDataForm.get('phoneNumber').value,
      address: this.basicDataForm.get('address').value,
    };
    const habits = {
      alcohol: this.habitForm.get('alcohol').value,
      alcoholNote: this.habitForm.get('alcoholNote').value || null,
      smoke: this.habitForm.get('smoke').value,
      smokeNote: this.habitForm.get('smokeNote').value || null,
      drugs: this.habitForm.get('drugs').value,
      coffee: this.habitForm.get('coffee').value,
      coffeeNote: this.habitForm.get('coffeeNote').value || null,
      tea: this.habitForm.get('tea').value,
      teaNote: this.habitForm.get('teaNote').value || null,
      socialLife: this.habitForm.get('socialLife').value,
      socialLifeNote: this.habitForm.get('socialLifeNote').value || null,
      stayUpLate: this.habitForm.get('stayUpLate').value,
      stayUpLateNote: this.habitForm.get('stayUpLateNote').value || null,
      sleepingHabits: {
        wakeUpTime: this.habitForm.get('wakeUpTime').value,
        sleepTime: this.habitForm.get('sleepTime').value,
      },
      eatingHabits: {
        breakfastTime: this.habitForm.get('breakfastTime').value,
        lunchTime: this.habitForm.get('lunchTime').value,
        dinnerTime: this.habitForm.get('dinnerTime').value,
        whoCooks: this.habitForm.get('whoCooks').value,
        breakfastAtHome: this.habitForm.get('breakfastAtHome').value,
        breakfastAtHomeNote: this.habitForm.get('breakfastAtHomeNote').value,
      },
      work: {
        description: this.habitForm.get('workDescription').value,
        schedules: this.habitForm.get('schedules').value,
        workOnWeekends: this.habitForm.get('workOnWeekends').value,
        workOnWeekendsNote: this.habitForm.get('workOnWeekendsNote').value || null,
        homeToWork: this.habitForm.get('homeToWork').value,
        workToHome: this.habitForm.get('workToHome').value,
        transportationMethod: this.habitForm.get('transportationMethod').value,
        eatDuringJob: this.habitForm.get('eatDuringJob').value,
        practicalSnackDuringJob: this.habitForm.get('practicalSnackDuringJob').value,
        snacksPreference: this.habitForm.get('snacksPreference').value,
        kitchenGadgetsAtWork: this.habitForm.get('kitchenGadgetsAtWork').value,
      }
    };
    const bodyFunctions = {
      diuresis: {
        urinateAmount: this.bodyFunctionsForm.get('urinateAmount').value,
        middleNightUrinate: this.bodyFunctionsForm.get('middleNightUrinate').value,
      },
      bowelMovements: {
        everyDay: this.bodyFunctionsForm.get('everyDay').value,
        everyDayAmount: this.bodyFunctionsForm.get('everyDayAmount').value || null,
        timesPerDay: this.bodyFunctionsForm.get('timesPerDay').value,
        sameSchedule: this.bodyFunctionsForm.get('sameSchedule').value,
      },
      appetite: {
        hungryScale: this.hungryScale,
        mostHungryMoment: this.bodyFunctionsForm.get('mostHungryMoment').value,
      },
      sleep: {
        sleepingStatus: this.bodyFunctionsForm.get('sleepingStatus').value,
        averageHours: this.bodyFunctionsForm.get('averageHours').value,
        troubleFallingAsleep: this.bodyFunctionsForm.get('troubleFallingAsleep').value,
        wakeUpEnergized: this.bodyFunctionsForm.get('wakeUpEnergized').value,
      }
    };
    const generalData = {
      general: {
        healthConditions: this.healthConditionsArray.value,
        gastritis: this.generalDataForm.get('gastritis').value,
        medication: this.generalDataForm.get('medication').value,
        pastTwoWeeks: this.pastTwoWeeksArray.value,
        dontEat: this.dontEatArray.value,
      },
      dinner: {
        portion: this.generalDataForm.get('portion').value,
        preparedBy: this.generalDataForm.get('preparedBy').value,
        eatAfterDinner: this.generalDataForm.get('eatAfterDinner').value,
        shoppingLocation: this.shoppingLocationArray.value,
        whoBuys: this.generalDataForm.get('whoBuys').value,
        orderOnline: this.generalDataForm.get('orderOnline').value,
      },
      physicalActivity: {
        physicalActivitiesConfirmation: this.generalDataForm.get('physicalActivitiesConfirmation').value,
        physicalActivities: this.activityArray.value || null,
        physicalActivitiesWhy: this.generalDataForm.get('physicalActivitiesWhy').value || null,
        workoutSchedule: this.generalDataForm.get('workoutSchedule').value,
        trainingLocation: this.generalDataForm.get('trainingLocation').value,
        travelTime: this.generalDataForm.get('travelTime').value,
        trainingIntensity: this.generalDataForm.get('trainingIntensity').value,
      },
      weekends: {
        wakeUpTime: this.generalDataForm.get('wakeUpTime').value,
        orderFood: this.generalDataForm.get('orderFood').value,
        orderFoodNote: this.generalDataForm.get('orderFoodNote').value,
      },
      supplements: {
        supplements: this.generalDataForm.get('supplements').value,
        supplementNote: this.generalDataForm.get('supplementNote').value,
        willingToUseSupps: this.generalDataForm.get('willingToUseSupps').value,
        eatingRecordatory: this.generalDataForm.get('eatingRecordatory').value,
      }
    };
    const data = {
      clientID: this.client.uid,
      specialistID: this.client.specialist,
      creationDate: new Date(),
      basicData: basicData,
      habits: habits,
      bodyFunctions: bodyFunctions,
      generalData: generalData,
      specialistNotes: this.noteForm.get('specialistNotes').value
    };
    console.log(data);
    // this.firstConsultationService.addFirstConsultation(data);
  }

  closeDialog() {
    if (confirm('Are you sure you want to stop creating this first consultation ?')) {
      this.dialog.closeAll();
    }
  }

}
