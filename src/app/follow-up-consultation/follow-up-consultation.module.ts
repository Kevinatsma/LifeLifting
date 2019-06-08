import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFollowUpComponent } from './add-follow-up/add-follow-up.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';
import { FollowUpConsultationService } from './follow-up-consultation.service';

@NgModule({
  declarations: [
    AddFollowUpComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  providers: [
    FollowUpConsultationService
  ],
  entryComponents: [
    AddFollowUpComponent
  ]
})
export class FollowUpConsultationModule { }
