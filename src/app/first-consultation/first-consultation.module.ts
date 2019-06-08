import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFirstConsultationComponent } from './add-first-consultation/add-first-consultation.component';
import { FirstConsultationService } from './first-consultation.service';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [
    AddFirstConsultationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    AddFirstConsultationComponent
  ],
  providers: [
    FirstConsultationService
  ],
  entryComponents: [
    AddFirstConsultationComponent
  ]
})
export class FirstConsultationModule { }
