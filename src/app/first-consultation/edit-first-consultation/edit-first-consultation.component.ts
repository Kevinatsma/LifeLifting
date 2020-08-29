import { Component, OnInit, Inject, HostListener, Input, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatStepper } from '@angular/material';
import { User } from '../../user/user.model';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { FirstConsultationService } from '../first-consultation.service';
import { Mealplan } from '../../mealplans/mealplan.model';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Time } from '../../shared/data/models/time.model';
import healthConditions from '../../shared/data/JSON/healthConditions.json';
import times from '../../shared/data/JSON/times.json';
import dietTypes from '../../shared/data/JSON/dietTypes.json';
import { Exercise } from '../../exercises/exercise.model';
import { ExerciseService } from '../../exercises/exercise.service';
import { FirstConsultation } from '../first-consultation.model';
import { UtilService } from '../../shared/services/util.service';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-edit-first-consultation',
  templateUrl: './edit-first-consultation.component.html',
  styleUrls: ['./../add-first-consultation/add-first-consultation.component.scss', './edit-first-consultation.component.scss']
})
export class EditFirstConsultationComponent implements OnInit, OnDestroy {
  // Elements
  @ViewChild('stepper') stepper: MatStepper;

  // Data
  firstConsultation: FirstConsultation;
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

  hungryScale: number;
  homeToWorkScale: number;
  workToHomeScale: number;
  age: number;
  birthDay$: Subscription;

  // Disable popup from closing
  @HostListener('window:keyup.esc') onKeyUp() {
    event.preventDefault();
    if (confirm('Are you sure you want to stop editing this first consultation? Your progress will be lost.')) {
      this.dialog.closeAll();
    }
  }

  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
      event.returnValue = false;
  }

  constructor( private fb: FormBuilder,
               private firstConsultationService: FirstConsultationService,
               private exerciseService: ExerciseService,
               private utilService: UtilService,
               public dialog: MatDialog,
               @Inject(MAT_DIALOG_DATA) public data: any) {
     this.client = _.get(data, 'client');
     this.firstConsultation = _.get(data, 'firstConsultation');
  }

  ngOnInit() {
    this.basicDataForm = this.fb.group({
      mealplanMainGoal: [this.firstConsultation.basicData.mealplanMainGoal, Validators.required],
      sex: [this.firstConsultation.basicData.sex, Validators.required],
      birthDate: [this.firstConsultation.basicData.birthDate.toDate(), Validators.required],
      height: [this.firstConsultation.basicData.height, Validators.required],
      phoneAreaCode: [this.firstConsultation.basicData.phoneNumber.areaCode, Validators.required],
      phoneNumber: [this.firstConsultation.basicData.phoneNumber.number, Validators.required],
      address: [this.firstConsultation.basicData.address, Validators.required],
    });
    this.habitForm = this.fb.group({
      alcohol: [this.firstConsultation.habits.alcohol, Validators.required],
      alcoholNote: [this.firstConsultation.habits.alcoholNote || ''],
      smoke: [this.firstConsultation.habits.smoke, Validators.required],
      smokeNote: [this.firstConsultation.habits.smokeNote || ''],
      drugs: [this.firstConsultation.habits.drugs, Validators.required],
      coffee: [this.firstConsultation.habits.coffee, Validators.required],
      coffeeNote: [this.firstConsultation.habits.coffeeNote || ''],
      tea: [this.firstConsultation.habits.tea, Validators.required],
      teaNote: [this.firstConsultation.habits.teaNote || ''],
      socialLife: [this.firstConsultation.habits.socialLife, Validators.required],
      socialLifeNote: [this.firstConsultation.habits.socialLifeNote || ''],
      stayUpLate: [this.firstConsultation.habits.stayUpLate, Validators.required],
      stayUpLateNote: [this.firstConsultation.habits.stayUpLateNote || ''],
      wakeUpTime: [this.firstConsultation.habits.sleepingHabits.wakeUpTime, Validators.required],
      sleepTime: [this.firstConsultation.habits.sleepingHabits.sleepTime, Validators.required],
      breakfastTime: [this.firstConsultation.habits.eatingHabits.breakfastTime, Validators.required],
      lunchTime: [this.firstConsultation.habits.eatingHabits.lunchTime, Validators.required],
      dinnerTime: [this.firstConsultation.habits.eatingHabits.dinnerTime, Validators.required],
      whoCooks: [this.firstConsultation.habits.eatingHabits.whoCooks, Validators.required],
      breakfastAtHome: [this.firstConsultation.habits.eatingHabits.breakfastAtHome, Validators.required],
      breakfastAtHomeNote: [this.firstConsultation.habits.eatingHabits.breakfastAtHomeNote || ''],
      timeForBreakfast: [this.firstConsultation.habits.eatingHabits.timeForBreakfast, Validators.required],
      timeForBreakfastNote: [this.firstConsultation.habits.eatingHabits.timeForBreakfastNote || ''],
      workDescription: [this.firstConsultation.habits.work.description, Validators.required],
      workScheduleFrom: [this.firstConsultation.habits.work.schedules.from, Validators.required],
      workScheduleTo: [this.firstConsultation.habits.work.schedules.to, Validators.required],
      workOnWeekends: [this.firstConsultation.habits.work.workOnWeekends, Validators.required],
      workOnWeekendsFrom: this.firstConsultation.habits.work.workOnWeekendsNote ?
        [this.firstConsultation.habits.work.workOnWeekendsNote.from] : [''],
      workOnWeekendsTo: this.firstConsultation.habits.work.workOnWeekendsNote ?
        [this.firstConsultation.habits.work.workOnWeekendsNote.to ] : [''],
      transportationMethod: [this.firstConsultation.habits.work.transportationMethod, Validators.required],
      eatDuringJob: [this.firstConsultation.habits.work.eatDuringJob, Validators.required],
      practicalSnackDuringJob: [this.firstConsultation.habits.work.practicalSnackDuringJob, Validators.required],
      snacksPreference: [this.firstConsultation.habits.work.snacksPreference, Validators.required],
      kitchenGadgetsAtWork: [this.firstConsultation.habits.work.kitchenGadgetsAtWork, Validators.required]
    });
    this.bodyFunctionsForm = this.fb.group({
      urinateAmount: [this.firstConsultation.bodyFunctions.diuresis.urinateAmount, Validators.required],
      middleNightUrinate: [this.firstConsultation.bodyFunctions.diuresis.middleNightUrinate, Validators.required],
      everyDay: [this.firstConsultation.bodyFunctions.bowelMovements.everyDay, Validators.required],
      timesPerWeek: [this.firstConsultation.bodyFunctions.bowelMovements.timesPerWeek || ''],
      timesPerDay: [this.firstConsultation.bodyFunctions.bowelMovements.timesPerDay || ''],
      sameSchedule: [this.firstConsultation.bodyFunctions.bowelMovements.sameSchedule, Validators.required],
      mostHungryMoment: [this.firstConsultation.bodyFunctions.appetite.mostHungryMoment, Validators.required],
      firstMenstrualPeriod: [this.firstConsultation.bodyFunctions.female.firstMenstrualPeriod || ''],
      regularCycle: [this.firstConsultation.bodyFunctions.female.regularCycle || ''],
      birthControlPills: [this.firstConsultation.bodyFunctions.female.birthControlPills || ''],
      birthControlPillsNote: [this.firstConsultation.bodyFunctions.female.birthControlPillsNote || ''],
      periodXDays: [this.firstConsultation.bodyFunctions.female.periodXDays || ''],
      bleedingXDays: [this.firstConsultation.bodyFunctions.female.bleedingXDays || ''],
      pregnancies: [this.firstConsultation.bodyFunctions.female.pregnancies || ''],
      sleepingStatus: [this.firstConsultation.bodyFunctions.appetite.mostHungryMoment, Validators.required],
      averageHours: [this.firstConsultation.bodyFunctions.sleep.averageHours, Validators.required],
      troubleFallingAsleep: [this.firstConsultation.bodyFunctions.sleep.troubleFallingAsleep, Validators.required],
      troubleFallingAsleepNote: [this.firstConsultation.bodyFunctions.sleep.troubleFallingAsleepNote || ''],
      wakeUpEnergized: [this.firstConsultation.bodyFunctions.sleep.wakeUpEnergized, Validators.required],
    });
    this.generalDataForm = this.fb.group({
      healthConditionsArr: this.fb.array([]),
      gastritis: [this.firstConsultation.generalData.general.gastritis, Validators.required],
      medication: [this.firstConsultation.generalData.general.medication, Validators.required],
      pastTwoWeeksArr: this.fb.array([]),
      dontEatArr: this.fb.array([]),
      dietType: [this.firstConsultation.generalData.general.dietType, Validators.required],
      portion: [this.firstConsultation.generalData.dinner.portion, Validators.required],
      preparedBy: [this.firstConsultation.generalData.dinner.preparedBy, Validators.required],
      eatAfterDinner: [this.firstConsultation.generalData.dinner.eatAfterDinner, Validators.required],
      eatAfterDinnerNote: [this.firstConsultation.generalData.dinner.eatAfterDinnerNote || ''],
      shoppingLocationArr: this.fb.array([]),
      whoBuys: [this.firstConsultation.generalData.dinner.whoBuys, Validators.required],
      orderOnline: [this.firstConsultation.generalData.dinner.orderOnline, Validators.required],
      physicalActivitiesConfirmation:
        [this.firstConsultation.generalData.physicalActivity.physicalActivitiesConfirmation, Validators.required],
      activityArr: this.fb.array([]),
      physicalActivitiesWhy: [this.firstConsultation.generalData.physicalActivity.physicalActivitiesWhy || ''],
      wakeUpTime: [this.firstConsultation.generalData.weekends.wakeUpTime, Validators.required],
      orderFood: [this.firstConsultation.generalData.weekends.orderFood, Validators.required],
      orderFoodNote: [this.firstConsultation.generalData.weekends.orderFoodNote || ''],
      supplements: [this.firstConsultation.generalData.supplements.supplements, Validators.required],
      supplementNote: [this.firstConsultation.generalData.supplements.supplementNote || ''],
      willingToUseSupps: [this.firstConsultation.generalData.supplements.willingToUseSupps, Validators.required],
      eatingRecordatory: [this.firstConsultation.generalData.supplements.eatingRecordatory, Validators.required],
    });
    this.noteForm = this.fb.group({
      specialistNotes: [this.firstConsultation.specialistNotes || ''],
    });

    this.exercises$ = this.exerciseService.getExercises().subscribe(exercises => this.activities = exercises);
    this.loadForm(this.firstConsultation);
    this.getBirthday();
  }

  ngOnDestroy() {
    this.birthDay$.unsubscribe();
    this.exercises$.unsubscribe();
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

  loadForm(data: FirstConsultation) {
    const healthConditionsArr = data.generalData.general.healthConditions;
    const pastTwoWeeks = data.generalData.general.pastTwoWeeks;
    const dontEat = data.generalData.general.dontEat;
    const shoppingLocations = data.generalData.dinner.shoppingLocations;
    const activities = data.generalData.physicalActivity.physicalActivities;
    this.hungryScale = data.bodyFunctions.appetite.hungryScale;
    this.homeToWorkScale = data.habits.work.homeToWork;
    this.workToHomeScale = data.habits.work.workToHome;

    _.forEach(healthConditionsArr, (condition) => {
      this.healthConditionsArray.push(this.createNewHealthCondition(condition));
    });

    _.forEach(pastTwoWeeks, (item) => {
      this.pastTwoWeeksArray.push(this.createNewPastTwoWeeks(item));
    });

    _.forEach(dontEat, (product) => {
      this.dontEatArray.push(this.createNewDontEat(product));
    });

    _.forEach(shoppingLocations, (location) => {
      this.shoppingLocationArray.push(this.createNewShoppingLocation(location));
    });

    _.forEach(activities, (activity) => {
      this.activityArray.push(this.createNewActivity(activity));
    });
  }

  // Create, add, delete form array items
  createHealthCondition(): FormGroup {
    return this.fb.group({
      healthCondition: ''
    });
  }
  createNewHealthCondition(condition): FormGroup {
    return this.fb.group({
      healthCondition: condition.healthCondition
    });
  }

  createPastTwoWeeks(): FormGroup {
    return this.fb.group({
      pastTwoWeeksValue: ''
    });
  }
  createNewPastTwoWeeks(pastTwoWeeks): FormGroup {
    return this.fb.group({
      pastTwoWeeksValue: pastTwoWeeks.pastTwoWeeksValue
    });
  }

  createDontEatItem(): FormGroup {
    return this.fb.group({
      dontEatItem: ''
    });
  }
  createNewDontEat(dontEatItem): FormGroup {
    return this.fb.group({
      dontEatItem: dontEatItem.dontEatItem
    });
  }

  createShoppingLocation(): FormGroup {
    return this.fb.group({
      shoppingLocation: ''
    });
  }
  createNewShoppingLocation(shoppingLocation): FormGroup {
    return this.fb.group({
      shoppingLocation: shoppingLocation.shoppingLocation
    });
  }

  createActivity(): FormGroup {
    return this.fb.group({
      physicalActivity: '',
      workoutScheduleFrom: '',
      workoutScheduleTo: '',
      trainingLocation: '',
      travelTime: '',
      trainingIntensity: ''
    });
  }

  createNewActivity(activity): FormGroup {
    return this.fb.group({
      physicalActivity: activity.physicalActivity,
      activitySpecification: activity.activitySpecification || '',
      workoutScheduleFrom: activity.workoutScheduleFrom,
      workoutScheduleTo: activity.workoutScheduleTo,
      trainingLocation: activity.trainingLocation,
      travelTime: activity.travelTime,
      trainingIntensity: activity.trainingIntensity,
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
  EditFirstConsultation() {
    const basicData = {
      mealplanMainGoal: this.basicDataForm.get('mealplanMainGoal').value || this.firstConsultation.basicData.mealplanMainGoal,
      sex: this.basicDataForm.get('sex').value || this.firstConsultation.basicData.sex,
      birthDate: this.basicDataForm.get('birthDate').value || this.firstConsultation.basicData.birthDate,
      height: this.basicDataForm.get('height').value || this.firstConsultation.basicData.height,
      phoneNumber: {
        areaCode: this.basicDataForm.get('phoneAreaCode').value || this.firstConsultation.basicData.phoneNumber.areaCode,
        number: this.basicDataForm.get('phoneNumber').value || this.firstConsultation.basicData.phoneNumber.number
      },
      address: this.basicDataForm.get('address').value || this.firstConsultation.basicData.address,
    };
    const habits = {
      alcohol: this.habitForm.get('alcohol').value || this.firstConsultation.habits.alcohol,
      alcoholNote: this.habitForm.get('alcoholNote').value || this.firstConsultation.habits.alcoholNote || null,
      smoke: this.habitForm.get('smoke').value || this.firstConsultation.habits.smoke,
      smokeNote: this.habitForm.get('smokeNote').value || this.firstConsultation.habits.smokeNote || null,
      drugs: this.habitForm.get('drugs').value || this.firstConsultation.habits.drugs,
      coffee: this.habitForm.get('coffee').value || this.firstConsultation.habits.coffee,
      coffeeNote: this.habitForm.get('coffeeNote').value || this.firstConsultation.habits.coffeeNote || null,
      tea: this.habitForm.get('tea').value || this.firstConsultation.habits.tea,
      teaNote: this.habitForm.get('teaNote').value || this.firstConsultation.habits.teaNote || null,
      socialLife: this.habitForm.get('socialLife').value || this.firstConsultation.habits.socialLife,
      socialLifeNote: this.habitForm.get('socialLifeNote').value || this.firstConsultation.habits.socialLifeNote || null,
      stayUpLate: this.habitForm.get('stayUpLate').value  || this.firstConsultation.habits.stayUpLate,
      stayUpLateNote: this.habitForm.get('stayUpLateNote').value  || this.firstConsultation.habits.stayUpLateNote || null,
      sleepingHabits: {
        wakeUpTime: this.habitForm.get('wakeUpTime').value || this.firstConsultation.habits.sleepingHabits.wakeUpTime,
        sleepTime: this.habitForm.get('sleepTime').value || this.firstConsultation.habits.sleepingHabits.sleepTime,
      },
      eatingHabits: {
        breakfastTime: this.habitForm.get('breakfastTime').value || this.firstConsultation.habits.eatingHabits.lunchTime,
        lunchTime: this.habitForm.get('lunchTime').value || this.firstConsultation.habits.eatingHabits.lunchTime,
        dinnerTime: this.habitForm.get('dinnerTime').value || this.firstConsultation.habits.eatingHabits.dinnerTime,
        whoCooks: this.habitForm.get('whoCooks').value  || this.firstConsultation.habits.eatingHabits.whoCooks,
        breakfastAtHome: this.habitForm.get('breakfastAtHome').value || this.firstConsultation.habits.eatingHabits.breakfastAtHome ,
        breakfastAtHomeNote: this.habitForm.get('breakfastAtHomeNote').value
          || this.firstConsultation.habits.eatingHabits.breakfastAtHomeNote || null,
        timeForBreakfast: this.habitForm.get('timeForBreakfast').value || this.firstConsultation.habits.eatingHabits.timeForBreakfast,
        timeForBreakfastNote: this.habitForm.get('timeForBreakfastNote').value
          || this.firstConsultation.habits.eatingHabits.timeForBreakfastNote || null
      },
      work: {
        description: this.habitForm.get('workDescription').value || this.firstConsultation.habits.work.description,
        schedules: {
          from: this.habitForm.get('workScheduleFrom').value || this.firstConsultation.habits.work.schedules.from,
          to: this.habitForm.get('workScheduleTo').value || this.firstConsultation.habits.work.schedules.to
        },
        workOnWeekends: this.habitForm.get('workOnWeekends').value || this.firstConsultation.habits.work.workOnWeekends,
        workOnWeekendsNote: this.habitForm.controls['workOnWeekendsNote'] ? {
          from: this.habitForm.get('workOnWeekendsFrom').value || this.firstConsultation.habits.work.workOnWeekendsNote.from,
          to: this.habitForm.get('workOnWeekendsTo').value || this.firstConsultation.habits.work.workOnWeekendsNote.to
        } : null,
        homeToWork: this.homeToWorkScale || this.firstConsultation.habits.work.homeToWork,
        workToHome: this.workToHomeScale || this.firstConsultation.habits.work.workToHome,
        transportationMethod: this.habitForm.get('transportationMethod').value || this.firstConsultation.habits.work.transportationMethod,
        eatDuringJob: this.habitForm.get('eatDuringJob').value || this.firstConsultation.habits.work.eatDuringJob,
        practicalSnackDuringJob: this.habitForm.get('practicalSnackDuringJob').value
          || this.firstConsultation.habits.work.practicalSnackDuringJob || null,
        snacksPreference: this.habitForm.get('snacksPreference').value  || this.firstConsultation.habits.work.snacksPreference,
        kitchenGadgetsAtWork: this.habitForm.get('kitchenGadgetsAtWork').value || this.firstConsultation.habits.work.kitchenGadgetsAtWork,
      }
    };
    const bodyFunctions = {
      diuresis: {
        urinateAmount: this.bodyFunctionsForm.get('urinateAmount').value || this.firstConsultation.bodyFunctions.diuresis.urinateAmount,
        middleNightUrinate: this.bodyFunctionsForm.get('middleNightUrinate').value
          || this.firstConsultation.bodyFunctions.diuresis.middleNightUrinate,
      },
      bowelMovements: {
        everyDay: this.bodyFunctionsForm.get('everyDay').value || this.firstConsultation.bodyFunctions.bowelMovements.everyDay,
        timesPerWeek: this.bodyFunctionsForm.get('timesPerWeek').value
          || this.firstConsultation.bodyFunctions.bowelMovements.timesPerWeek || null,
        timesPerDay: this.bodyFunctionsForm.get('timesPerDay').value || this.firstConsultation.bodyFunctions.bowelMovements.timesPerDay,
        sameSchedule: this.bodyFunctionsForm.get('sameSchedule').value || this.firstConsultation.bodyFunctions.bowelMovements.sameSchedule,
      },
      appetite: {
        hungryScale: this.hungryScale || this.firstConsultation.bodyFunctions.appetite.hungryScale,
        mostHungryMoment: this.bodyFunctionsForm.get('mostHungryMoment').value
          || this.firstConsultation.bodyFunctions.appetite.mostHungryMoment,
      },
      female: {
        firstMenstrualPeriod: this.bodyFunctionsForm.get('firstMenstrualPeriod').value ||
          this.firstConsultation.bodyFunctions.female.firstMenstrualPeriod || null,
        regularCycle: this.bodyFunctionsForm.get('regularCycle').value ||
          this.firstConsultation.bodyFunctions.female.regularCycle || null,
        birthControlPills: this.bodyFunctionsForm.get('birthControlPills').value ||
          this.firstConsultation.bodyFunctions.female.birthControlPills || null,
        birthControlPillsNote: this.bodyFunctionsForm.get('birthControlPillsNote').value ||
          this.firstConsultation.bodyFunctions.female.birthControlPillsNote || null,
        periodXDays: this.bodyFunctionsForm.get('periodXDays').value ||
          this.firstConsultation.bodyFunctions.female.periodXDays || null,
        bleedingXDays: this.bodyFunctionsForm.get('bleedingXDays').value ||
          this.firstConsultation.bodyFunctions.female.bleedingXDays || null,
        pregnancies: this.bodyFunctionsForm.get('pregnancies').value ||
          this.firstConsultation.bodyFunctions.female.pregnancies || null,
      },
      sleep: {
        sleepingStatus: this.bodyFunctionsForm.get('sleepingStatus').value || this.firstConsultation.bodyFunctions.sleep.sleepingStatus,
        averageHours: this.bodyFunctionsForm.get('averageHours').value  || this.firstConsultation.bodyFunctions.sleep.averageHours,
        troubleFallingAsleep: this.bodyFunctionsForm.get('troubleFallingAsleep').value
          || this.firstConsultation.bodyFunctions.sleep.troubleFallingAsleep,
        troubleFallingAsleepNote: this.bodyFunctionsForm.get('troubleFallingAsleepNote').value
          || this.firstConsultation.bodyFunctions.diuresis.urinateAmount || null,
        wakeUpEnergized: this.bodyFunctionsForm.get('wakeUpEnergized').value || this.firstConsultation.bodyFunctions.sleep.wakeUpEnergized,
      }
    };
    const generalData = {
      general: {
        healthConditions: this.healthConditionsArray.value || this.firstConsultation.generalData.general.healthConditions,
        gastritis: this.generalDataForm.get('gastritis').value || this.firstConsultation.generalData.general.gastritis,
        medication: this.generalDataForm.get('medication').value || this.firstConsultation.generalData.general.medication,
        pastTwoWeeks: this.pastTwoWeeksArray.value || this.firstConsultation.generalData.general.pastTwoWeeks,
        dontEat: this.dontEatArray.value || this.firstConsultation.generalData.general.dontEat,
        dietType: this.generalDataForm.get('dietType').value || this.firstConsultation.generalData.general.dietType
      },
      dinner: {
        portion: this.generalDataForm.get('portion').value || this.firstConsultation.generalData.dinner.portion,
        preparedBy: this.generalDataForm.get('preparedBy').value || this.firstConsultation.generalData.dinner.preparedBy,
        eatAfterDinner: this.generalDataForm.get('eatAfterDinner').value || this.firstConsultation.generalData.dinner.eatAfterDinner,
        eatAfterDinnerNote: this.generalDataForm.get('eatAfterDinnerNote').value
          || this.firstConsultation.generalData.dinner.eatAfterDinnerNote || null,
        shoppingLocations: this.shoppingLocationArray.value || this.firstConsultation.generalData.dinner.shoppingLocations,
        whoBuys: this.generalDataForm.get('whoBuys').value  || this.firstConsultation.generalData.dinner.whoBuys,
        orderOnline: this.generalDataForm.get('orderOnline').value || this.firstConsultation.generalData.dinner.orderOnline,
      },
      physicalActivity: {
        physicalActivitiesConfirmation: this.generalDataForm.get('physicalActivitiesConfirmation').value
          || this.firstConsultation.generalData.physicalActivity.physicalActivitiesConfirmation,
        physicalActivities: this.activityArray.value
          || this.firstConsultation.generalData.physicalActivity.physicalActivities || null,
        physicalActivitiesWhy: this.generalDataForm.get('physicalActivitiesWhy').value
          || this.firstConsultation.generalData.physicalActivity.physicalActivitiesWhy || null,
      },
      weekends: {
        wakeUpTime: this.generalDataForm.get('wakeUpTime').value
          || this.firstConsultation.generalData.weekends.wakeUpTime,
        orderFood: this.generalDataForm.get('orderFood').value
          || this.firstConsultation.generalData.weekends.orderFood,
        orderFoodNote: this.generalDataForm.get('orderFoodNote').value
          || this.firstConsultation.generalData.weekends.orderFoodNote || null,
      },
      supplements: {
        supplements: this.generalDataForm.get('supplements').value || this.firstConsultation.generalData.supplements.supplements,
        supplementNote: this.generalDataForm.get('supplementNote').value
          || this.firstConsultation.generalData.supplements.supplementNote || null,
        willingToUseSupps: this.generalDataForm.get('willingToUseSupps').value
          || this.firstConsultation.generalData.supplements.willingToUseSupps,
        eatingRecordatory: this.generalDataForm.get('eatingRecordatory').value
          || this.firstConsultation.generalData.supplements.eatingRecordatory,
      }
    };

    const data = {
      clientID: this.firstConsultation.clientID,
      edited: new Date(),
      basicData: basicData,
      habits: habits,
      bodyFunctions: bodyFunctions,
      generalData: generalData,
      specialistNotes: this.noteForm.get('specialistNotes').value  || this.firstConsultation.specialistNotes
    };

    const ficID = this.firstConsultation.ficID;
    this.firstConsultationService.updateFirstConsultation(ficID, data);
  }

  closeDialog() {
    if (confirm('Are you sure you want to stop editing this first consultation ?')) {
      this.dialog.closeAll();
    }
  }

}
