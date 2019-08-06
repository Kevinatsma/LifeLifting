import { Component, OnInit, Input, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { MealplanService } from '../mealplan.service';
import { Mealplan } from '../mealplan.model';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user.model';
import { AuthService } from './../../core/auth/auth.service';
import { EditMealDialogComponent } from './../../shared/dialogs/edit-meal-dialog/edit-meal-dialog.component';
import { PrintMealplanComponent } from '../print-mealplan/print-mealplan.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mealplan-list-item',
  templateUrl: './mealplan-list-item.component.html',
  styleUrls: ['./mealplan-list-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MealplanListItemComponent implements OnInit, OnDestroy {
  @Input() mealplan: Mealplan;
  @Input() i;
  detailOpen = false;
  client: User;
  client$: Subscription;

  constructor( public auth: AuthService,
               public router: Router,
               public dialog: MatDialog,
               private userService: UserService,
               private mealplanService: MealplanService) { }

  ngOnInit() {
    this.client$ = this.userService.getUserDataByID(this.mealplan.clientID).subscribe(user => this.client = user);
  }

  ngOnDestroy() {
    this.client$.unsubscribe();
  }

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
      } else if (result === false) {
        return null;
      }
    });
  }

  duplicateMealplan(mealplan) {
    this.mealplanService.duplicateMealplan(mealplan);
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

  linkToChild(mealplan) {
    const url = `dashboard/mealplans/${mealplan.mID}`;
    this.router.navigate([url]);
  }

  linkToShoppingList(mealplan) {
    const url = `dashboard/shopping-list/${mealplan.mID}`;
    this.router.navigate([url]);
  }

}
