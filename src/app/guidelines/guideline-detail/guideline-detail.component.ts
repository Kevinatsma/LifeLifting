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
import { ExerciseService } from './../../exercises/exercise.service';
import { Exercise } from './../../exercises/exercise.model';
import { ConfirmDialogComponent } from './../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { AuthService } from './../../core/auth/auth.service';
import { Measurement } from './../../measurement/measurement.model';
import { FirstConsultation } from './../../first-consultation/first-consultation.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { MeasurementDetailComponent } from './../../measurement/measurement-detail/measurement-detail.component';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-guideline-detail',
  templateUrl: './guideline-detail.component.html',
  styleUrls: ['./guideline-detail.component.scss', './../guideline-list-item/guideline-list-item.component.scss']
})
export class GuidelineDetailComponent implements OnInit {
  guideline: Guideline;
  guideExercises: Object;
  exercises: any;
  exerciseOne: Exercise;
  exerciseTwo: Exercise;
  exerciseThree: Exercise;
  specialist: Specialist;
  aboutExtended = false;
  reviewsVisible = true;
  client: User;
  gainWeight: boolean;
  increaseCals: boolean;

  actionMenuOpen: boolean;
  editStateChange: Subject<boolean> = new Subject<boolean>();

  measurements: Measurement[];
  measurement: Measurement;
  fics: FirstConsultation[];

  constructor( public auth: AuthService,
               private afs: AngularFirestore,
               private cdr: ChangeDetectorRef,
               public dialog: MatDialog,
               public router: Router,
               public route: ActivatedRoute,
               private userService: UserService,
               public exerciseService: ExerciseService,
               public guidelineService: GuidelineService,
               public specialistService: SpecialistService,
               public location: Location) {
                this.aboutExtended = false;

                this.editStateChange.subscribe((value) => {
                  this.actionMenuOpen = value;
                });
  }

  ngOnInit() {
    this.getGuideline();
  }

  // Getters
  getGuideline() {
    this.gainWeight = this.guidelineService.gainWeight;
    const id = this.route.snapshot.paramMap.get('id');
    this.guidelineService.getGuidelineDataById(id)
      .subscribe(guideline => {
        this.guideline = guideline;
        this.userService.getUserDataByID(guideline.clientID).subscribe(user => {
            this.client = user;
            this.getExtraDocs(user.uid);
        });
        this.setTarget(guideline);
        this.setIncreaseCals(guideline);
        this.getExercises(guideline);
      });
  }

  getExtraDocs(uid) {
    const measurementRef = this.afs.collection('measurements', ref => ref.where('clientID', '==', `${uid}`)).valueChanges();
    measurementRef.pipe(take(1)).subscribe(measurements => {
      this.measurements = <Measurement[]>measurements;
      this.measurement = this.measurements.find(m => {
        return m.measurementID === `${this.guideline.measurementID}`;
      });
      this.guidelineService.updateMeasurements(measurements);
    });

    const ficRef = this.afs.collection('first-consultations', ref => ref.where('clientID', '==', `${uid}`)).valueChanges();
    ficRef.pipe(take(1)).subscribe(fics => {
      this.fics = <FirstConsultation[]>fics;
      this.guidelineService.updateFics(fics);
    });
  }

  // Set values

  setTarget(guideline) {
    if ( guideline.target === 'gain') {
      this.guidelineService.gainWeight = true;
    } else {
      this.guidelineService.gainWeight = false;
    }
    return this.gainWeight = this.guidelineService.gainWeight;
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

  // Getters
  getExercises(guideline) {
    this.exerciseService.getMultipleExercises(guideline);
    this.exerciseService.guideExercises.eOne.subscribe(exercise => {
      this.exerciseOne = exercise;
    });
    if (this.exerciseService.guideExercises.eTwo) {
      this.exerciseService.guideExercises.eTwo.subscribe(exercise => {
        this.exerciseTwo = exercise;
      });
    }
    if (this.exerciseService.guideExercises.eThree) {
      this.exerciseService.guideExercises.eThree.subscribe(exercise => {
      this.exerciseThree = exercise;
      });
    }

    this.exercises = [
      this.exerciseOne,
      this.exerciseTwo,
      this.exerciseThree
    ];
  }

  // Like this to avoid State Changed Error
  // Open/closers

  get editShow(): boolean {
    return this.guidelineService.editShow;
  }

  toggleEdit() {
    this.guidelineService.toggleEdit();
  }

  toggleButtonMenu() {
    const buttons = document.querySelectorAll('.action-btn');
    buttons.forEach(button => {
      button.classList.toggle('visible');
    });
    this.editStateChange.next(!this.actionMenuOpen);
  }

  printGuideline() {
    alert('TODO: Print Service, Print Templates, Etc.');
  }

  // Delete guideline

  deleteGuidelineDialog(guideline) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        gID: guideline.gID,
        guidelineName: guideline.guidelineName,
      },
      panelClass: 'confirm-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const id = guideline.gID;
        this.guidelineService.deleteGuideline(id);
        this.router.navigate(['../']);
      } else if (result === false) {
        return null;
      }
    });
  }

  // Links
  linkToMeasurement() {
    const dialogRef = this.dialog.open(MeasurementDetailComponent, {
      data: {
        measurement: this.measurement
      },
      panelClass: 'measurement-detail-dialog'
    });
  }

  linkToFic(ficID) {
    const url = `dashboard/first-consultations/${ficID}`;
    this.router.navigate([url]);
  }

  goBack() {
    this.location.back();
  }
}
