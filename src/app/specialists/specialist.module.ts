import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddSpecialistComponent } from './add-specialist/add-specialist.component';
import { SpecialistService } from './specialist.service';
import { SpecialistsComponent } from './specialists/specialists.component';
import { SpecialistItemComponent } from './specialist-item/specialist-item.component';

@NgModule({
  declarations: [
    AddSpecialistComponent,
    SpecialistItemComponent,
    SpecialistsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    AddSpecialistComponent,
    SpecialistItemComponent,
    SpecialistsComponent
  ],
  providers: [
    SpecialistService
  ]
})
export class SpecialistModule { }
