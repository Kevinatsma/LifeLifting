import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OnlineAppointmentComponent } from './online-appointment/online-appointment.component';
import { FaceToFaceAppointmentComponent } from './face-to-face-appointment/face-to-face-appointment.component';
import { BookingComponent } from './booking/booking.component';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';

// Booking modules
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  declarations: [
    OnlineAppointmentComponent,
    FaceToFaceAppointmentComponent,
    BookingComponent
  ],
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    MaterialModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
  ],
  exports: [
    OnlineAppointmentComponent,
    FaceToFaceAppointmentComponent,
    BookingComponent
  ]
})
export class BookingModule { }
