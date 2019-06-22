import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFirstConsultationComponent } from './add-first-consultation/add-first-consultation.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';
import { FirstConsultationService } from './first-consultation.service';
import { EditFirstConsultationComponent } from './edit-first-consultation/edit-first-consultation.component';
import { FirstConsultationListComponent } from './first-consultation-list/first-consultation-list.component';
import { FirstConsultationListItemComponent } from './first-consultation-list-item/first-consultation-list-item.component';
import { RouterModule } from '@angular/router';
import { FirstConsultationDetailComponent } from './first-consultation-detail/first-consultation-detail.component';
import { MealplansModule } from '../mealplans/mealplans.module';

@NgModule({
  declarations: [
    AddFirstConsultationComponent,
    EditFirstConsultationComponent,
    FirstConsultationListComponent,
    FirstConsultationListItemComponent,
    FirstConsultationDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MaterialModule,
    MealplansModule
  ],
  exports: [
    AddFirstConsultationComponent,
    EditFirstConsultationComponent,
    FirstConsultationListComponent,
    FirstConsultationListItemComponent,
    FirstConsultationDetailComponent
  ],
  providers: [
    FirstConsultationService
  ],
  entryComponents: [
    AddFirstConsultationComponent,
    EditFirstConsultationComponent,
    FirstConsultationDetailComponent
  ]
})
export class FirstConsultationModule { }
