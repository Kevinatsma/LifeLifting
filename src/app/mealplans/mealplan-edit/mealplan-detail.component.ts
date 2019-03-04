import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MealplanService } from '../mealplan.service';
import { Specialist } from '../../specialists/specialist.model';
import { SpecialistService } from '../../specialists/specialist.service';
import { Mealplan } from '../mealplan.model';
import { User } from './../../user/user.model';
import { UserService } from './../../user/user.service';
import { ExerciseService } from './../../exercises/exercise.service';
import { Exercise } from './../../exercises/exercise.model';
import { ConfirmDialogComponent } from './../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { GuidelineService } from './../../guidelines/guideline.service';
import { Guideline } from './../../guidelines/guideline.model';


@Component({
  selector: 'app-mealplan-detail',
  templateUrl: './mealplan-detail.component.html',
  styleUrls: ['./mealplan-detail.component.scss', './../mealplan-list-item/mealplan-list-item.component.scss'],
})
export class MealplanDetailComponent implements OnInit {
  mealplan: Mealplan;

  // Navigation
  tabs = document.querySelectorAll('.nav-item');
  mondayTab = true;
  tuesdayTab = false;
  wednesdayTab = false;
  thursdayTab = false;
  fridayTab = false;
  suppsTab = false;

  // Exercises
  guideline: Guideline;
  guideExercises: Object;
  exercises: {
    eOne: any;
    eTwo: any;
    eThree: any;
  };
  exerciseOne: Exercise;
  exerciseTwo: Exercise;
  exerciseThree: Exercise;

  specialist: Specialist;
  aboutExtended = false;
  reviewsVisible = true;
  client: User;
  gainWeight: boolean;
  increaseCals: boolean;


  // specialist = Observable<Specialist>;

  constructor( private cdr: ChangeDetectorRef,
               public dialog: MatDialog,
               public router: Router,
               public route: ActivatedRoute,
               private userService: UserService,
               public exerciseService: ExerciseService,
               public guidelineService: GuidelineService,
               public mealplanService: MealplanService,
               public specialistService: SpecialistService,
               public location: Location) {
                this.aboutExtended = false;
  }

  ngOnInit() {
    // this.setMenu();
    this.getMealplan();
  }

  getMealplan() {
    this.gainWeight = this.mealplanService.gainWeight;
    const id = this.route.snapshot.paramMap.get('id');
    this.mealplanService.getMealplanDataById(id)
      .subscribe(mealplan => {
        this.mealplan = mealplan;
        this.userService.getUserDataByID(mealplan.clientID).subscribe(user => this.client = user);
        this.getGuideline(mealplan);
      });
  }

  // Getters

  getGuideline(mealplan) {
    const id = mealplan.guideline;
    console.log(id);
    this.guidelineService.getGuidelineDataById(id)
      .subscribe(guideline => {
        this.guideline = guideline;
        console.log(this.guideline);
        this.getExercises(this.guideline);
      });
  }

  getExercises(guideline) {
    console.log(guideline);
    this.exerciseService.getMultipleExercises(guideline);
    this.exerciseService.guideExercises.eOne.subscribe(exercise => {
      this.exercises.eOne = exercise;
      console.log(exercise);
    });
    if (this.exerciseService.guideExercises.eTwo) {
      this.exerciseService.guideExercises.eTwo.subscribe(exercise => {
        return this.exercises.eTwo = exercise;
      });
    } else if (this.exerciseService.guideExercises.eThree) {
      this.exerciseService.guideExercises.eThree.subscribe(exercise => {
        this.exerciseTwo = exercise;
      });
    }
    this.exercises = {
      eOne: this.exerciseOne,
      eTwo: this.exerciseTwo,
      eThree: this.exerciseThree
    };
    console.log(this.exercises.eTwo);

  }

  // Like this to avoid State Changed Error
  // Open/closers

  get editShow(): boolean {
    return this.mealplanService.editShow;
  }

  toggleEdit() {
    this.mealplanService.toggleEdit();
  }

  aboutExtendedOpen() {
    this.aboutExtended = true;
    this.cdr.detectChanges();
  }

  aboutExtendedClose() {
    this.aboutExtended = false;
    this.cdr.detectChanges();
  }

  // Form tab navigation

  // setMenu() {
  //   this.tabs.forEach(tab => {
  //     tab.addEventListener('click', () => this.updateTabStates);
  //   });
  // }

  updateTabStates(e) {
    const tabs: NodeListOf<Element> = document.querySelectorAll('.nav-item');

    // Reset first
    this.resetDisplayContent(tabs);

    // Redirect click behavior
    const link = e.target.getAttribute('id');
    const activeLink = document.getElementById(link);
    activeLink.classList.add('active');

    // show/hide containers
    if (link === 'monday') {
      this.mondayTab = true;
    } else if (link === 'tuesday') {
      this.tuesdayTab = true;
    } else if (link === 'wednesday') {
      this.wednesdayTab = true;
    } else if (link === 'thursday') {
      this.thursdayTab = true;
    } else if (link === 'friday') {
      this.fridayTab = true;
    } else if (link === 'supps') {
      this.suppsTab = true;
    } else {
      return null;
    }
  }

  resetDisplayContent(tabs) {
    tabs.forEach(tab => {
      tab.classList.remove('active');
    });
    this.mondayTab = false;
    this.tuesdayTab = false;
    this.wednesdayTab = false;
    this.thursdayTab = false;
    this.fridayTab = false;
    this.suppsTab = false;
  }

  // Delete mealplan

  deleteMealplanDialog(mealplan) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        mealplanID: mealplan.mealplanID,
        mealplanName: mealplan.mealplanName,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const id = mealplan.mealplanID;
        this.mealplanService.deleteMealplan(id);
        this.router.navigate(['../']);
      } else if (result === false) {
        return null;
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
