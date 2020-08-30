// Modules
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatNativeDateModule } from '@angular/material/core';

// Components
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { DataService } from './../data/data.service';
import { AddClientDialogComponent } from './add-client-dialog/add-client-dialog.component';
import { AddPackageDialogComponent } from './add-package-dialog/add-package-dialog.component';
import { AddFoodDialogComponent } from './add-food-dialog/add-food-dialog.component';
import { AddExerciseDialogComponent } from './add-exercise-dialog/add-exercise-dialog.component';
import { AddMealDialogComponent } from './add-meal-dialog/add-meal-dialog.component';
import { AddGuideDialogComponent } from './add-guide-dialog/add-guide-dialog.component';
import { SharedModule } from '../shared.module';
import { AddSpecialistDialogComponent } from './add-specialist-dialog/add-specialist-dialog.component';
import { DialogModule } from './add-meal-dialog/dialog.module';
import { AddReviewDialogComponent } from './add-review-dialog/add-review-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { EditDialogModule } from './edit-dialog/edit-dialog.module';
import { BookingModule } from './../../booking/booking.module';
import { ChooseMealplanDialogComponent } from './choose-mealplan-dialog/choose-mealplan-dialog.component';
import { AddAppointmentDialogComponent } from './add-appointment-dialog/add-appointment-dialog.component';
import { AppointmentDetailDialogComponent } from './appointment-detail-dialog/appointment-detail-dialog.component';
import { EditAppointmentComponent } from './appointment-detail-dialog/edit-appointment/edit-appointment.component';
import { EditMealDialogModule } from './edit-meal-dialog/edit-meal-dialog.module';
import { DisplayTextDialogComponent } from './display-text-dialog/display-text-dialog.component';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    EditDialogComponent,
    AddUserDialogComponent,
    AddClientDialogComponent,
    AddPackageDialogComponent,
    AddFoodDialogComponent,
    AddAppointmentDialogComponent,
    AppointmentDetailDialogComponent,
    AddReviewDialogComponent,
    AddExerciseDialogComponent,
    AddMealDialogComponent,
    AddGuideDialogComponent,
    ChooseMealplanDialogComponent,
    EditAppointmentComponent,
    DisplayTextDialogComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DialogModule,
    EditDialogModule,
    EditMealDialogModule,
    SharedModule,
    MaterialModule,
    MatDialogModule,
    MatNativeDateModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    BookingModule
  ],
  exports: [
    ConfirmDialogComponent,
    EditDialogComponent,
    AddUserDialogComponent,
    AddClientDialogComponent,
    AddPackageDialogComponent,
    AddFoodDialogComponent,
    AddAppointmentDialogComponent,
    AppointmentDetailDialogComponent,
    EditAppointmentComponent,
    AddReviewDialogComponent,
    AddExerciseDialogComponent,
    AddMealDialogComponent,
    AddGuideDialogComponent,
    ChooseMealplanDialogComponent
  ],
  entryComponents: [
    ConfirmDialogComponent,
    EditDialogComponent,
    AddSpecialistDialogComponent,
    AddUserDialogComponent,
    AddClientDialogComponent,
    AddPackageDialogComponent,
    AddFoodDialogComponent,
    AddAppointmentDialogComponent,
    AppointmentDetailDialogComponent,
    AddReviewDialogComponent,
    AddExerciseDialogComponent,
    AddMealDialogComponent,
    AddGuideDialogComponent,
    ChooseMealplanDialogComponent,
    DisplayTextDialogComponent
  ],
  providers: [
    DataService
  ]
})
export class DialogsModule { }
