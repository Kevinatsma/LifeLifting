import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { OnlineAppointmentComponent } from './online-appointment/online-appointment.component';
import { FaceToFaceAppointmentComponent } from './face-to-face-appointment/face-to-face-appointment.component';

@NgModule({
  declarations: [
    OnlineAppointmentComponent,
    FaceToFaceAppointmentComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule
  ],
  exports: [
    OnlineAppointmentComponent,
    FaceToFaceAppointmentComponent
  ]
})
export class BookingModule { }
