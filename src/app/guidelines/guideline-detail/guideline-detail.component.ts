import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GuidelineService } from '../guideline.service';
import { Specialist } from '../../specialists/specialist.model';
import { SpecialistService } from '../../specialists/specialist.service';
import { Guideline } from '../guideline.model';
import { User } from './../../user/user.model';
import { UserService } from './../../user/user.service';
import { ExerciseService } from 'src/app/exercises/exercise.service';
import { Exercise } from 'src/app/exercises/exercise.model';
import { ConfirmDialogComponent } from './../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-guideline-detail',
  templateUrl: './guideline-detail.component.html',
  styleUrls: ['./guideline-detail.component.scss', './../guideline-list-item/guideline-list-item.component.scss']
})
export class GuidelineDetailComponent implements OnInit {
  guideline: Guideline;
  exercise: Exercise;
  specialist: Specialist;
  aboutExtended = false;
  reviewsVisible = true;
  client: User;
  targetIsLoss: boolean;
  increaseCals: boolean;

  // specialist = Observable<Specialist>;

  constructor( private cdr: ChangeDetectorRef,
               public dialog: MatDialog,
               public router: Router,
               public route: ActivatedRoute,
               private userService: UserService,
               public exerciseService: ExerciseService,
               public guidelineService: GuidelineService,
               public specialistService: SpecialistService,
               public location: Location) {
                this.aboutExtended = false;
  }

  ngOnInit() {
    this.getGuideline();
  }

  getGuideline() {
    const id = this.route.snapshot.paramMap.get('id');
    this.guidelineService.getGuidelineDataById(id).subscribe(guideline => {
      this.guideline = guideline;
      this.userService.getUserDataByID(this.guideline.clientID).subscribe(user => this.client = user);
      this.setTarget(guideline);
      this.setIncreaseCals(guideline);
      this.exerciseService.getExerciseData(guideline.activity).subscribe(exercise => this.exercise = exercise);
    });
  }

  // Set values

  setTarget(guideline) {
    if ( guideline.target === 'gain') {
      return this.targetIsLoss = false;
    } else {
      return this.targetIsLoss = true;
    }
  }

  setIncreaseCals(guideline) {
    if ( guideline.increaseCalories === 'increase') {
      return this.increaseCals = true;
    } else {
      return this.increaseCals = false;
    }
  }

  aboutExtendedOpen() {
    this.aboutExtended = true;
    this.cdr.detectChanges();
  }

  aboutExtendedClose() {
    this.aboutExtended = false;
    this.cdr.detectChanges();
  }

  // Like this to avoid State Changed Error
  // Open/closers

  get editShow(): boolean {
    return this.guidelineService.editShow;
  }

  toggleEdit() {
    this.guidelineService.toggleEdit();
  }

  // Delete guideline

  deleteGuidelineDialog(guideline) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        guidelineID: guideline.guidelineID,
        guidelineName: guideline.guidelineName,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result === true) {
        console.log('i"m being called');
        const id = guideline.guidelineID;
        this.guidelineService.deleteGuideline(id);
      } else if (result === false) {
        return null;
      }
    });
  }
}
