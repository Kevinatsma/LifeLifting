import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { FirstConsultation } from '../first-consultation.model';
import { User } from '../../user/user.model';
import { MealplanService } from '../../mealplans/mealplan.service';
import { Mealplan } from '../../mealplans/mealplan.model';

@Component({
  selector: 'app-first-consultation-detail',
  templateUrl: './first-consultation-detail.component.html',
  styleUrls: ['./first-consultation-detail.component.scss']
})
export class FirstConsultationDetailComponent implements OnInit {
  firstConsultation: FirstConsultation;
  client: User;
  mealplan: Mealplan;

  constructor( public dialog: MatDialog,
               private mealService: MealplanService,
               @Inject(MAT_DIALOG_DATA) public data: any) {
                  this.firstConsultation = data.firstConsultation;
                  this.client = data.client;
                  this.getMealplan(data.firstConsultation.mealplanID);
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
