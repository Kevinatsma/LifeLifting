import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFollowUpComponent } from './add-follow-up/add-follow-up.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';
import { FollowUpConsultationService } from './follow-up-consultation.service';
import { EditFollowUpComponent } from './edit-follow-up/edit-follow-up.component';
import { FollowUpListComponent } from './follow-up-list/follow-up-list.component';
import { FollowUpListItemComponent } from './follow-up-list-item/follow-up-list-item.component';
import { RouterModule } from '@angular/router';
import { FollowUpDetailComponent } from './follow-up-detail/follow-up-detail.component';
import { MealplansModule } from '../mealplans/mealplans.module';

@NgModule({
  declarations: [
    AddFollowUpComponent,
    EditFollowUpComponent,
    FollowUpListComponent,
    FollowUpListItemComponent,
    FollowUpDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MaterialModule,
    MealplansModule
  ],
  exports: [
    AddFollowUpComponent,
    EditFollowUpComponent,
    FollowUpListComponent,
    FollowUpListItemComponent,
    FollowUpDetailComponent
  ],
  providers: [
    FollowUpConsultationService
  ]
})
export class FollowUpConsultationModule { }
