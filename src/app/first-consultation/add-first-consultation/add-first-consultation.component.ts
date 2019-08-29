import { Component, OnInit, Inject, HostListener, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatStepper } from '@angular/material';
import { User } from '../../user/user.model';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FirstConsultationService } from '../first-consultation.service';
import { Mealplan } from '../../mealplans/mealplan.model';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Time } from './../../shared/data/models/time.model';
import times from './../../shared/data/JSON/times.json';
import dietTypes from './../../shared/data/JSON/dietTypes.json';
import healthConditions from './../../shared/data/JSON/healthConditions.json';
import { Exercise } from './../../exercises/exercise.model';
import { ExerciseService } from './../../exercises/exercise.service';
import { UtilService } from './../../shared/services/util.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-first-consultation',
  templateUrl: './add-first-consultation.component.html',
  styleUrls: ['./add-first-consultation.component.scss']
})
export class AddFirstConsultationComponent implements OnInit, OnDestroy {
  // Elements
  @ViewChild('stepper', {static: false}) stepper: MatStepper;

  // Data
  client: User;
  mealplans: Mealplan[];
  mealplansCol: AngularFirestoreCollection<Mealplan>;
  healthConditions = healthConditions.conditions;
  times: Time[] = times.times;
  dietTypes: any[] = dietTypes.dietTypes;
  activities: Exercise[];
  exercises$: Subscription;

  // Form
  basicDataForm: FormGroup;
  habitForm: FormGroup;
  bodyFunctionsForm: FormGroup;
  generalDataForm: FormGroup;
  noteForm: FormGroup;

  // Form Arrays
  healthConditionsArr: FormArray;
  healthCondition = new FormControl('', [Validators.required]);
  pastTwoWeeksArr: FormArray;
  pastTwoWeeksValue = new FormControl('', [Validators.required]);
  dontEatArr: FormArray;
  dontEatItem = new FormControl('', [Validators.required]);
  shoppingLocationArr: FormArray;
  shoppingLocation = new FormControl('', [Validators.required]);
  activityArr: FormArray;
  physicalActivity = new FormControl('', [Validators.required]);

  hungryScale: string;
  homeToWorkScale: string;
  workToHomeScale: string;
  birthDay$: Subscription;
  age: number;

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

  constructor( private cdr: ChangeDetectorRef,
               private fb: FormBuilder,
               private firstConsultationService: FirstConsultationService,
               private exerciseService: ExerciseService,
               private utilService: UtilService,
               public dialog: MatDialog,
               @Inject(MAT_DIALOG_DATA) public data: any) {
     this.client = data.client;
  }

  ngOnInit() {
    this.basicDataForm = this.fb.group({
      mealplanMainGoal: ['', Validators.required],
      sex: ['', Validators.required],
      birthDate: ['', Validators.required],
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
      breakfastAtHomeNote: [''],
      timeForBreakfast: ['', Validators.required],
      timeForBreakfastNote: [''],
      workDescription: ['', Validators.required],
      workScheduleFrom: ['', Validators.required],
      workScheduleTo: ['', Validators.required],
      workOnWeekends: ['', Validators.required],
      workOnWeekendsFrom: [''],
      workOnWeekendsTo: [''],
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
      timesPerWeek: [''],
      timesPerDay: [''],
      sameSchedule: ['', Validators.required],
      mostHungryMoment: ['', Validators.required],
      firstMenstrualPeriod: [''],
      regularCycle: [''],
      birthControlPills: [''],
      birthControlPillsNote: [''],
      pregnancies: [''],
      periodXDays: [''],
      bleedingXDays: [''],
      sleepingStatus: ['', Validators.required],
      averageHours: ['', Validators.required],
      troubleFallingAsleep: ['', Validators.required],
      troubleFallingAsleepNote: [''],
      wakeUpEnergized: ['', Validators.required],
    });
    this.generalDataForm = this.fb.group({
      healthConditionsArr: this.fb.array([ this.createHealthCondition() ]),
      gastritis: ['', Validators.required],
      medication: ['', Validators.required],
      pastTwoWeeksArr: this.fb.array([ this.createPastTwoWeeks() ]),
      dontEatArr: this.fb.array([ this.createDontEatItem() ]),
      dietType: ['', Validators.required],
      portion: ['', Validators.required],
      preparedBy: ['', Validators.required],
      eatAfterDinner: ['', Validators.required],
      eatAfterDinnerNote: [''],
      shoppingLocationArr: this.fb.array([ this.createShoppingLocation() ]),
      whoBuys: ['', Validators.required],
      orderOnline: ['', Validators.required],
      physicalActivitiesConfirmation: ['', Validators.required],
      activityArr: this.fb.array([ this.createActivity() ]),
      physicalActivitiesWhy: [''],
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

    this.exercises$ = this.exerciseService.getExercises().subscribe(exercises => this.activities = exercises);
    this.getBirthday();
  }

  ngOnDestroy() {
    this.exercises$.unsubscribe();
    this.birthDay$.unsubscribe();
  }

  // Getters

  get healthConditionsArray() {
    return this.generalDataForm.get('healthConditionsArr') as FormArray;
  }
  get pastTwoWeeksArray() {
    return this.generalDataForm.get('pastTwoWeeksArr') as FormArray;
  }
  get dontEatArray() {
    return this.generalDataForm.get('dontEatArr') as FormArray;
  }
  get shoppingLocationArray() {
    return this.generalDataForm.get('shoppingLocationArr') as FormArray;
  }
  get activityArray() {
    return this.generalDataForm.get('activityArr') as FormArray;
  }

  getChosenActivity(index): FormGroup {
    const activityArr = this.generalDataForm.get('activityArr') as FormArray;
    const formGroup = activityArr.controls[index] as FormGroup;
    return formGroup;
  }

  getBirthday() {
    this.birthDay$ = this.basicDataForm.get('birthDate').valueChanges.subscribe(val => {
      this.age = this.utilService.getAge(val);
    });
  }

  // Create, add, delete form array items
  createHealthCondition(): FormGroup {
    return this.fb.group({
      healthCondition: ''
    });
  }

  createPastTwoWeeks(): FormGroup {
    return this.fb.group({
      pastTwoWeeksValue: ''
    });
  }

  createDontEatItem(): FormGroup {
    return this.fb.group({
      dontEatItem: ''
    });
  }

  createShoppingLocation(): FormGroup {
    return this.fb.group({
      shoppingLocation: ''
    });
  }

  createActivity(): FormGroup {
    return this.fb.group({
      physicalActivity: '',
      activitySpecification: '',
      workoutScheduleFrom: '',
      workoutScheduleTo: '',
      trainingLocation: '',
      travelTime: '',
      trainingIntensity: '',
    });
  }

  addHealthCondition(): void {
    this.healthConditionsArray.push(this.createHealthCondition());
  }

  addPastTwoWeeks(): void {
    this.pastTwoWeeksArray.push(this.createPastTwoWeeks());
  }

  addDontEatItem(): void {
    this.dontEatArray.push(this.createDontEatItem());
  }

  addShoppingLocation(): void {
    this.shoppingLocationArray.push(this.createShoppingLocation());
  }

  addActivity(): void {
    this.activityArray.push(this.createActivity());
  }

  deleteHealthCondition(i) {
    (this.generalDataForm.get('healthConditionsArr') as FormArray).removeAt(i);
  }

  deletePastTwoWeeks(i) {
    (this.generalDataForm.get('pastTwoWeeksArr') as FormArray).removeAt(i);
  }

  deleteDontEatItem(i) {
    (this.generalDataForm.get('dontEatArr') as FormArray).removeAt(i);
  }

  deleteShoppingLocation(i) {
    (this.generalDataForm.get('shoppingLocationArr') as FormArray).removeAt(i);
  }

  deleteActivity(i) {
    (this.generalDataForm.get('activityArr') as FormArray).removeAt(i);
  }

  // Navigation

  handleNavClick(e) {
    const scrollTarget = e.target.getAttribute('data-scroll-target');
    this.handleStepNavigation(scrollTarget);
  }

  handleStepNavigation(step) {
    let stepTarget: number;
    step = step.toLowerCase();

    if (step.includes('-')) {
      const section = step.split('-')[0];
      stepTarget = this.checkStep(section);
      this.goToStep(stepTarget);

      setTimeout(() => {
        // Scroll to anchor
        const stepAnchor = step.split('-')[1];
        const scrollAnchor = document.getElementById(`${stepAnchor}`);
        scrollAnchor.scrollIntoView();
      }, 100);

    } else {
      step = step.split('-')[0];
      stepTarget = this.checkStep(step);
      this.goToStep(stepTarget);

      setTimeout(() => {
        const scrollAnchor = document.getElementById(`${step}`);
        scrollAnchor.scrollIntoView();
      }, 100);

    }
  }

  checkStep(step) {
    let stepTarget;
    switch (step) {
      case 'generalone':
        stepTarget = 0;
        break;
      case 'habits':
        stepTarget = 1;
        break;
      case 'bodyfunctions':
        stepTarget = 2;
        break;
      case 'generaltwo':
        stepTarget = 3;
        break;
      case 'notes':
        stepTarget = 4;
        break;
      default:
        alert('Unknown category...');
    }
    return stepTarget;
  }

  goToStep(step: number) {
    return this.stepper.selectedIndex = step;
  }


  // Upload results
  addFirstConsultation() {
    const basicData = {
      mealplanMainGoal: this.basicDataForm.get('mealplanMainGoal').value,
      sex: this.basicDataForm.get('sex').value,
      birthDate: this.basicDataForm.get('birthDate').value,
      height: this.basicDataForm.get('height').value,
      phoneNumber: {
        areaCode: this.basicDataForm.get('phoneAreaCode').value,
        number: this.basicDataForm.get('phoneNumber').value
      },
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
        breakfastAtHomeNote: this.habitForm.get('breakfastAtHomeNote').value || null,
        timeForBreakfast: this.habitForm.get('timeForBreakfast').value,
        timeForBreakfastNote: this.habitForm.get('timeForBreakfastNote').value || null
      },
      work: {
        description: this.habitForm.get('workDescription').value,
        schedules: {
          from: this.habitForm.get('workScheduleFrom').value,
          to: this.habitForm.get('workScheduleTo').value
        },
        workOnWeekends: this.habitForm.get('workOnWeekends').value,
        workOnWeekendsNote: {
          from: this.habitForm.get('workOnWeekendsFrom').value || null,
          to: this.habitForm.get('workOnWeekendsTo').value || null
        },
        homeToWork: this.homeToWorkScale,
        workToHome: this.workToHomeScale,
        transportationMethod: this.habitForm.get('transportationMethod').value,
        eatDuringJob: this.habitForm.get('eatDuringJob').value,
        practicalSnackDuringJob: this.habitForm.get('practicalSnackDuringJob').value || null,
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
        timesPerWeek: this.bodyFunctionsForm.get('timesPerWeek').value || null,
        timesPerDay: this.bodyFunctionsForm.get('timesPerDay').value,
        sameSchedule: this.bodyFunctionsForm.get('sameSchedule').value,
      },
      appetite: {
        hungryScale: this.hungryScale,
        mostHungryMoment: this.bodyFunctionsForm.get('mostHungryMoment').value,
      },
      female: {
        firstMenstrualPeriod: this.bodyFunctionsForm.get('firstMenstrualPeriod').value || null,
        regularCycle: this.bodyFunctionsForm.get('regularCycle').value || null,
        birthControlPills: this.bodyFunctionsForm.get('birthControlPills').value || null,
        birthControlPillsNote: this.bodyFunctionsForm.get('birthControlPillsNote').value || null,
        periodXDays: this.bodyFunctionsForm.get('periodXDays').value || null,
        bleedingXDays: this.bodyFunctionsForm.get('bleedingXDays').value || null,
        pregnancies: this.bodyFunctionsForm.get('pregnancies').value || null
      },
      sleep: {
        sleepingStatus: this.bodyFunctionsForm.get('sleepingStatus').value,
        averageHours: this.bodyFunctionsForm.get('averageHours').value,
        troubleFallingAsleep: this.bodyFunctionsForm.get('troubleFallingAsleep').value,
        troubleFallingAsleepNote: this.bodyFunctionsForm.get('troubleFallingAsleepNote').value || null,
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
        dietType: this.generalDataForm.get('dietType').value
      },
      dinner: {
        portion: this.generalDataForm.get('portion').value,
        preparedBy: this.generalDataForm.get('preparedBy').value,
        eatAfterDinner: this.generalDataForm.get('eatAfterDinner').value,
        eatAfterDinnerNote: this.generalDataForm.get('eatAfterDinnerNote').value || null,
        shoppingLocations: this.shoppingLocationArray.value,
        whoBuys: this.generalDataForm.get('whoBuys').value,
        orderOnline: this.generalDataForm.get('orderOnline').value,
      },
      physicalActivity: {
        physicalActivitiesConfirmation: this.generalDataForm.get('physicalActivitiesConfirmation').value,
        physicalActivities: this.activityArray.value || null,
        physicalActivitiesWhy: this.generalDataForm.get('physicalActivitiesWhy').value || null,
      },
      weekends: {
        wakeUpTime: this.generalDataForm.get('wakeUpTime').value,
        orderFood: this.generalDataForm.get('orderFood').value,
        orderFoodNote: this.generalDataForm.get('orderFoodNote').value || null,
      },
      supplements: {
        supplements: this.generalDataForm.get('supplements').value,
        supplementNote: this.generalDataForm.get('supplementNote').value || null,
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
      specialistNotes: this.noteForm.get('specialistNotes').value || null
    };

    this.firstConsultationService.addFirstConsultation(data);
  }

  closeDialog() {
    if (confirm('Are you sure you want to stop creating this first consultation ?')) {
      this.dialog.closeAll();
    }
  }

}
