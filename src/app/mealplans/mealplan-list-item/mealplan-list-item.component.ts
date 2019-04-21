import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { MealplanService } from '../mealplan.service';
import { Mealplan } from '../mealplan.model';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user.model';
import { AuthService } from './../../core/auth/auth.service';

@Component({
  selector: 'app-mealplan-list-item',
  templateUrl: './mealplan-list-item.component.html',
  styleUrls: ['./mealplan-list-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MealplanListItemComponent implements OnInit {
  @Input() mealplan: Mealplan;
  @Input() i;
  detailOpen = false;
  client: User;

  constructor( public auth: AuthService,
               public router: Router,
               public dialog: MatDialog,
               private userService: UserService,
               private mealplanService: MealplanService) { }

  ngOnInit() {
    this.userService.getUserDataByID(this.mealplan.clientID).subscribe(user => this.client = user);
  }

  deleteMealplanDialog(mealplan) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        mID: mealplan.mID,
        mealplanName: mealplan.mealplanName,
      },
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

  openShoppingList(mealplan) {
    alert('TODO: OPEN SHOPPING LIST FOR THIS MEALPLAN');
  }

  editMealplan(mealplan) {
    alert('TODO: EDIT MEALPLAN');
    // const url = `dashboard/mealplans/${mealplan.mID}`;
    // this.router.navigate([url]);
    // return this.mealplanService.editShow = true;
  }


  linkToChild(mealplan) {
    const url = `dashboard/mealplans/${mealplan.mID}`;
    this.router.navigate([url]);
  }

}
