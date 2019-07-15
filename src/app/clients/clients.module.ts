import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './clients.component';
import { ClientListComponent } from './client-list/client-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';
import { GuidelinesModule } from './../guidelines/guidelines.module';
import { ClientService } from './client.service';
import { DataService } from '../shared/data/data.service';
import { ClientListItemComponent } from './client-list-item/client-list-item.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { MealplansModule } from '../mealplans/mealplans.module';
import { MeasurementModule } from '../measurement/measurement.module';
import { FollowUpConsultationModule } from '../follow-up-consultation/follow-up-consultation.module';
import { FirstConsultationModule } from '../first-consultation/first-consultation.module';

@NgModule({
  declarations: [
    ClientsComponent,
    ClientListComponent,
    ClientListItemComponent,
    ClientDetailComponent,
    EditClientComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    GuidelinesModule,
    MealplansModule,
    MaterialModule,
    FirstConsultationModule,
    MeasurementModule,
    FollowUpConsultationModule
  ],
  exports: [
    ClientsComponent
  ],
  providers: [
    ClientService,
    DataService
  ],
})
export class ClientsModule { }
