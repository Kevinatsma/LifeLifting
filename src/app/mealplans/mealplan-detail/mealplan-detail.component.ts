import { Location } from '@angular/common';
import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MealplanService } from '../mealplan.service';
import { Mealplan } from '../mealplan.model';
import { User } from './../../user/user.model';
import { UserService } from './../../user/user.service';
import { ExerciseService } from './../../exercises/exercise.service';
import { Exercise } from './../../exercises/exercise.model';
import { ConfirmDialogComponent } from './../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { GuidelineService } from './../../guidelines/guideline.service';
import { Guideline } from './../../guidelines/guideline.model';
import { AuthService } from './../../core/auth/auth.service';
import { EditMealDialogComponent } from './../../shared/dialogs/edit-meal-dialog/edit-meal-dialog.component';
import { Subject, Subscription } from 'rxjs';
import { UtilService } from './../../shared/services/util.service';
import { DisplayTextDialogComponent } from './../../shared/dialogs/display-text-dialog/display-text-dialog.component';
import { PrintMealplanComponent } from './../print-mealplan/print-mealplan.component';


@Component({
  selector: 'app-mealplan-detail',
  templateUrl: './mealplan-detail.component.html',
  styleUrls: ['./mealplan-detail.component.scss', './../mealplan-list-item/mealplan-list-item.component.scss'],
})
export class MealplanDetailComponent implements OnInit, OnDestroy {
  mealplanNav: ElementRef;
  firstNavItem: ElementRef;
  @ViewChild('mealplanNav') set content(content: ElementRef) {
    this.mealplanNav = content;
  }
 mealplan: Mealplan;
 mealplan$: Subscription;
 isMobile: boolean;

  // Navigation
  highlight: HTMLSpanElement;
  mondayTab = true;
  tuesdayTab = false;
  wednesdayTab = false;
  thursdayTab = false;
  fridayTab = false;
  suppsTab = false;

  guideline: Guideline;
  guideline$: Subscription;
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
  stateChange$: Subscription;

  constructor( public auth: AuthService,
               public dialog: MatDialog,
               public router: Router,
               public route: ActivatedRoute,
               private utils: UtilService,
               private userService: UserService,
               public exerciseService: ExerciseService,
               public guidelineService: GuidelineService,
               public mealplanService: MealplanService,
               public location: Location) {
                this.aboutExtended = false;
                setTimeout(() => {
                  this.createHighlight(this.mealplanNav.nativeElement);
                }, 1000);
                this.stateChange$ = this.editStateChange.subscribe((value) => {
                  this.actionMenuOpen = value;
                });

                this.isMobile = this.utils.checkIfMobile();
  }

  ngOnInit() {
    this.getMealplan();
    this.user$ = this.userService.getUserDataByID(this.auth.currentUserId).subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.user$.unsubscribe();
    this.client$.unsubscribe();
    this.guideline$.unsubscribe();
    this.stateChange$.unsubscribe();
    this.mealplan$.unsubscribe();
  }

  // Getters

  getMealplan() {
    this.gainWeight = this.mealplanService.gainWeight;
    setTimeout(() => {
      const id = this.route.snapshot.paramMap.get('id');
      this.mealplan$ = this.mealplanService.getMealplanDataById(id).subscribe(mealplan => {
        this.mealplan = mealplan;
        this.client$ = this.userService.getUserDataByID(mealplan.clientID).subscribe(user => this.client = user);
        this.getGuideline(mealplan);
        });
    }, 500);
  }


  getGuideline(mealplan) {
    const id = mealplan.supplementation.guideline;
    this.guideline$ = this.guidelineService.getGuidelineDataById(id)
      .subscribe(guideline => {
        this.guideline = guideline;
      });
  }

  // Like this to avoid State Changed Error
  // Open/closers

  get editShow(): boolean {
    return this.mealplanService.editShow;
  }

  editMealplan(mealplan) {
    const dialogRef = this.dialog.open(EditMealDialogComponent, {
      data: {
        mealplan: mealplan,
        client: this.client
      },
      panelClass: 'mealplan-dialog',
      disableClose: true
    });
  }

  openNotesDialog(mealplan) {
    const dialogRef = this.dialog.open(DisplayTextDialogComponent, {
      data: {
        title: `Extra notes for ${this.mealplan.mealplanName}`,
        text: this.mealplan.extraNotes
      },
      panelClass: 'display-text-dialog'
    });
  }

  aboutExtendedToggle() {
    this.aboutExtended = this.aboutExtended ? this.aboutExtended : false;
    // this.cdr.detectChanges();
  }

  /*
  ** Form tab navigation
  */

  createHighlight(nav) {
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

  // Print mealplan
  printMealplan(mealplan: Mealplan) {
    const dialogRef = this.dialog.open(PrintMealplanComponent, {
      data: {
        mealplan: this.mealplan,
        client: this.client,
      },
      panelClass: 'print-dialog',
    });
  }

  // Delete mealplan

  deleteMealplanDialog(mealplan) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        mID: mealplan.mID,
        mealplanName: mealplan.mealplanName,
      },
      panelClass: 'confirm-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const id = mealplan.mID;
        this.mealplanService.deleteMealplan(id);
        this.router.navigate(['../']);
      } else if (result === false) {
        return null;
      }
    });
  }

  linkToShoppingList(mealplan) {
    const url = `dashboard/shopping-list/${mealplan.mID}`;
    this.router.navigate([url]);
  }

  goBack() {
    this.location.back();
  }
}
