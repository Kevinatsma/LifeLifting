import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeasurementDetailComponent } from './measurement-detail/measurement-detail.component';
import { AddMeasurementComponent } from './add-measurement/add-measurement.component';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { MeasurementService } from './measurement.service';
import { MeasurementListItemComponent } from './measurement-list-item/measurement-list-item.component';
import { EditMeasurementComponent } from './edit-measurement/edit-measurement.component';
import { MeasurementListComponent } from './measurement-list/measurement-list.component';

@NgModule({
  declarations: [
    MeasurementDetailComponent,
    AddMeasurementComponent,
    MeasurementListItemComponent,
    EditMeasurementComponent,
    MeasurementListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    MeasurementDetailComponent,
    AddMeasurementComponent,
    MeasurementListItemComponent,
    EditMeasurementComponent,
    MeasurementListComponent
  ],
  providers: [
    MeasurementService
  ]
})
export class MeasurementModule { }
