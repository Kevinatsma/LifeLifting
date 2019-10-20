import { Location } from '@angular/common';
import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirstConsultationService } from '../first-consultation.service';
import { Specialist } from '../../specialists/specialist.model';
import { SpecialistService } from '../../specialists/specialist.service';
import { FirstConsultation } from '../first-consultation.model';
import { User } from '../../user/user.model';
import { UserService } from '../../user/user.service';
import { ExerciseService } from '../../exercises/exercise.service';
import { Exercise } from '../../exercises/exercise.model';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { GuidelineService } from '../../guidelines/guideline.service';
import { Guideline } from '../../guidelines/guideline.model';
import { AuthService } from '../../core/auth/auth.service';
import { EditFirstConsultationComponent } from './../edit-first-consultation/edit-first-consultation.component';
import { Subject, Subscription } from 'rxjs';
import { UtilService } from '../../shared/services/util.service';
import { DisplayTextDialogComponent } from '../../shared/dialogs/display-text-dialog/display-text-dialog.component';


@Component({
  selector: 'app-first-consultation-detail',
  templateUrl: './first-consultation-detail.component.html',
  styleUrls: [
    './first-consultation-detail.component.scss',
    './../first-consultation-list-item/first-consultation-list-item.component.scss'
  ]
})
export class FirstConsultationDetailComponent implements OnInit, OnDestroy {
  firstConsultationNav: ElementRef;
  firstNavItem: ElementRef;
  @ViewChild('firstConsultationNav', {static: false}) set content(content: ElementRef) {
    this.firstConsultationNav = content;
  }
 firstConsultation$: Subscription;
 firstConsultation: FirstConsultation;

 isMobile: boolean;

  // Navigation
  highlight: HTMLSpanElement;
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
  exerciseOne$: Subscription;
  exerciseTwo: Exercise;
  exerciseTwo$: Subscription;
  exerciseThree: Exercise;
  exerciseThree$: Subscription;

  specialist: Specialist;
  aboutExtended = false;
  reviewsVisible = true;
  user: User;
  user$: Subscription;
  client: User;
  client$: Subscription;
  gainWeight: boolean;
  increaseCals: boolean;
  actionMenuOpen: boolean;
  editStateChange: Subject<boolean> = new Subject<boolean>();

  constructor( public auth: AuthService,
               public dialog: MatDialog,
               public router: Router,
               public route: ActivatedRoute,
               private utils: UtilService,
               private userService: UserService,
               public exerciseService: ExerciseService,
               public guidelineService: GuidelineService,
               public firstConsultationService: FirstConsultationService,
               public specialistService: SpecialistService,
               public location: Location) {
                this.aboutExtended = false;
                setTimeout(() => {
                  this.createHighlight(this.firstConsultationNav.nativeElement);
                }, 1000);
                this.editStateChange.subscribe((value) => {
                  this.actionMenuOpen = value;
                });
                this.isMobile = this.utils.checkIfMobile();
              }

  ngOnInit() {
    this.getFirstConsultation();
    this.user$ = this.userService.getUserDataByID(this.auth.currentUserId).subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    if (this.firstConsultation$ !== undefined) { this.firstConsultation$.unsubscribe(); }
    if (this.user$ !== undefined) { this.user$.unsubscribe(); }
    if (this.client$ !== undefined) { this.client$.unsubscribe(); }
    if (this.exerciseOne$ !== undefined) { this.exerciseOne$.unsubscribe(); }
    if (this.exerciseTwo !== undefined) { this.exerciseTwo$.unsubscribe(); }
    if (this.exerciseThree !== undefined) { this.exerciseThree$.unsubscribe(); }
  }

  // Getters

  getFirstConsultation() {
    setTimeout(() => {
      const id = this.route.snapshot.paramMap.get('id');
      this.firstConsultation$ = this.firstConsultationService.getFirstConsultationDataById(id)
        .subscribe(firstConsultation => {
          this.firstConsultation = firstConsultation;
          this.client$ = this.userService.getUserDataByID(firstConsultation.clientID).subscribe(user => {
            this.client = user;
          });
        });
    }, 500);
  }

  getExercises(guideline) {
    this.exerciseService.getMultipleExercises(guideline);
    this.exerciseOne$ = this.exerciseService.guideExercises.eOne.subscribe(exercise => {
      this.exercises.eOne = exercise;
    });
    if (this.exerciseService.guideExercises.eTwo) {
      this.exerciseTwo$ = this.exerciseService.guideExercises.eTwo.subscribe(exercise => {
        this.exercises.eTwo = exercise;
      });
    }
    if (this.exerciseService.guideExercises.eThree) {
      this.exerciseThree$ = this.exerciseService.guideExercises.eThree.subscribe(exercise => {
        this.exercises.eThree = exercise;
      });
    }
    this.exercises = {
      eOne: this.exerciseOne,
      eTwo: this.exerciseTwo,
      eThree: this.exerciseThree
    };

  }

  // Like this to avoid State Changed Error
  // Open/closers

  editFirstConsultation(firstConsultation) {
    this.dialog.open(EditFirstConsultationComponent, {
      data: {
        firstConsultation: firstConsultation,
        client: this.client
      },
      panelClass: 'first-consultation-dialog',
      disableClose: true
    });
  }

  openNotesDialog() {
    this.dialog.open(DisplayTextDialogComponent, {
      data: {
        title: `Extra notes for this consultation`,
        text: this.firstConsultation.specialistNotes
      },
      panelClass: 'display-text-dialog'
    });
  }

  aboutExtendedToggle() {
    this.aboutExtended = this.aboutExtended ? this.aboutExtended : false;
  }

  /*
  ** Form tab navigation
  */

  createHighlight(nav) {
    setTimeout(() => {
      if (!this.isMobile) {
        // Create Element
        this.highlight = document.createElement('span');
        this.highlight.classList.add('highlight');
        nav.append(this.highlight);

        // Set initial value
        const firstItem = document.getElementById('monday');
        const firstItemCoords = (firstItem as any).getBoundingClientRect();
        this.highlight.style.width = '5vw';
        this.highlight.style.left = `translateX(${firstItemCoords.left}px)`;
      }
    });
  }

  // initiateHighlight() {
  //   this.highlight.style.left = '5vw';
  // }

  updateTabStates(e) {
    if (!this.isMobile) {
      const highlighter: NodeListOf<Element> = document.querySelectorAll('.highlight');
      highlighter.forEach(el => {
        el.classList.add('left');
      });
    }
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

  resetHighlights() {
    const highlights = document.querySelectorAll('.highlight');
    highlights.forEach(e => {
      e.parentNode.removeChild(e);
    });
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

  toggleButtonMenu() {
    const buttons = document.querySelectorAll('.action-btn');
    buttons.forEach(button => {
      button.classList.toggle('visible');
    });
    this.editStateChange.next(!this.actionMenuOpen);
  }

  highlightLinks(e) {
    if (!this.isMobile) {
      const highlights: NodeListOf<Element> = document.querySelectorAll('.highlight');
      highlights.forEach(hl => {
        hl.classList.add('left');
      });

      const el = e.target;
      const linkCoords = (el as any).getBoundingClientRect();
      const coords = {
        width: linkCoords.width,
        height: linkCoords.height,
        top: linkCoords.top + scrollY,
        left: linkCoords.left
      };
      const highlighter: HTMLSpanElement = document.querySelector('.highlight') || this.highlight;
      highlighter.style.width = `${coords.width}px`;
      highlighter.style.height = `${coords.height}px`;
      highlighter.style.transform = `translateX(${coords.left}px)`;
    }
  }

  // Delete firstConsultation

  deleteFirstConsultationDialog(firstConsultation) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        ficID: firstConsultation.ficID,
        firstConsultationName: firstConsultation.firstConsultationName,
      },
      panelClass: 'confirm-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const id = firstConsultation.mID;
        this.firstConsultationService.deleteFirstConsultation(id);
        this.router.navigate(['../']);
      } else if (result === false) {
        return null;
      }
    });
  }

  linkToShoppingList(firstConsultation) {
    const url = `dashboard/shopping-list/${firstConsultation.mID}`;
    this.router.navigate([url]);
  }

  goBack() {
    this.location.back();
  }
}

