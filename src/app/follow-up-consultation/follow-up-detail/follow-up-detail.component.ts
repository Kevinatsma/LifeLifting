import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { FollowUpConsultation } from '../follow-up-consultation.model';
import { User } from './../../user/user.model';
import { MealplanService } from './../../mealplans/mealplan.service';
import { Mealplan } from './../../mealplans/mealplan.model';

@Component({
  selector: 'app-follow-up-detail',
  templateUrl: './follow-up-detail.component.html',
  styleUrls: ['./follow-up-detail.component.scss']
})
export class FollowUpDetailComponent implements OnInit {
  followUp: FollowUpConsultation;
  client: User;
  mealplan: Mealplan;

  constructor( public dialog: MatDialog,
               private mealService: MealplanService,
               @Inject(MAT_DIALOG_DATA) public data: any) {
                  this.followUp = data.followUp;
                  this.client = data.client;
                  this.getMealplan(data.followUp.mealplanID);
              }

  ngOnInit() {
  }

  getMealplan(mID) {
    this.mealService.getMealplanDataById(mID).subscribe(mealplan => this.mealplan = mealplan);
  }

  closeDialog() {
    this.dialog.closeAll();
  }

}
