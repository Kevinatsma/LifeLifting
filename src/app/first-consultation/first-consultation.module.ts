import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFirstConsultationComponent } from './add-first-consultation/add-first-consultation.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';
import { FirstConsultationService } from './first-consultation.service';
import { FirstConsultationListComponent } from './first-consultation-list/first-consultation-list.component';
import { FirstConsultationListItemComponent } from './first-consultation-list-item/first-consultation-list-item.component';
import { RouterModule } from '@angular/router';
import { FirstConsultationDetailComponent } from './first-consultation-detail/first-consultation-detail.component';
import { MealplansModule } from '../mealplans/mealplans.module';
import { EditFirstConsultationComponent } from './edit-first-consultation/edit-first-consultation.component';
import { FirstConsultBasicComponent } from './first-consultation-detail/first-consult-basic/first-consult-basic.component';
import { FirstConsultHabitsComponent } from './first-consultation-detail/first-consult-habits/first-consult-habits.component';
import { FirstConsultBodyComponent } from './first-consultation-detail/first-consult-body/first-consult-body.component';
import { FirstConsultGeneralComponent } from './first-consultation-detail/first-consult-general/first-consult-general.component';

@NgModule({
  declarations: [
    AddFirstConsultationComponent,
    EditFirstConsultationComponent,
    FirstConsultationListComponent,
    FirstConsultationListItemComponent,
    FirstConsultationDetailComponent,
    FirstConsultBasicComponent,
    FirstConsultHabitsComponent,
    FirstConsultBodyComponent,
    FirstConsultGeneralComponent
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
  ]
})
export class FirstConsultationModule { }
