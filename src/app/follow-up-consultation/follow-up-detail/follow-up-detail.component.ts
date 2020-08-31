import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FollowUpConsultation } from '../follow-up-consultation.model';
import { User } from './../../user/user.model';
import { MealplanService } from './../../mealplans/mealplan.service';
import { Mealplan } from './../../mealplans/mealplan.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-follow-up-detail',
  templateUrl: './follow-up-detail.component.html',
  styleUrls: ['./follow-up-detail.component.scss']
})
export class FollowUpDetailComponent implements OnDestroy {
  followUp: FollowUpConsultation;
  client: User;
  mealplan: Mealplan;
  mealplan$: Subscription;

  constructor( public dialog: MatDialog,
               private mealService: MealplanService,
               @Inject(MAT_DIALOG_DATA) public data: any) {
                  this.followUp = data.followUp;
                  this.client = data.client;
                  this.getMealplan(data.followUp.mealplanID);
              }

  ngOnDestroy() {
    this.mealplan$.unsubscribe();
  }

  getMealplan(mID) {
    this.mealplan$ = this.mealService.getMealplanDataById(mID).subscribe(mealplan => this.mealplan = mealplan);
  }

  closeDialog() {
    this.dialog.closeAll();
  }

}
