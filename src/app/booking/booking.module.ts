import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OnlineAppointmentComponent } from './online-appointment/online-appointment.component';
import { FaceToFaceAppointmentComponent } from './face-to-face-appointment/face-to-face-appointment.component';
import { BookingComponent } from './booking/booking.component';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [
    OnlineAppointmentComponent,
    FaceToFaceAppointmentComponent,
    BookingComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule
  ],
  exports: [
    OnlineAppointmentComponent,
    FaceToFaceAppointmentComponent,
    BookingComponent

  ]
})
export class BookingModule { }
