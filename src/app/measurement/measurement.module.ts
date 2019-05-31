import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeasurementDetailComponent } from './measurement-detail/measurement-detail.component';
import { AddMeasurementComponent } from './add-measurement/add-measurement.component';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { MeasurementService } from './measurement.service';

@NgModule({
  declarations: [
    MeasurementDetailComponent,
    AddMeasurementComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    MeasurementDetailComponent,
    AddMeasurementComponent
  ],
  entryComponents: [
    MeasurementDetailComponent,
    AddMeasurementComponent
  ],
  providers: [
    MeasurementService
  ]
})
export class MeasurementModule { }
