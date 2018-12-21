import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddSpecialistComponent } from './add-specialist/add-specialist.component';
import { SpecialistService } from './specialist.service';
import { SpecialistsComponent } from './specialists/specialists.component';
import { SpecialistItemComponent } from './specialist-item/specialist-item.component';
import { DataService } from '../shared/data/data.service';
import { SpecialistListComponent } from './specialist-list/specialist-list.component';
import { SpecialistListItemComponent } from './specialist-list-item/specialist-list-item.component';

@NgModule({
  declarations: [
    AddSpecialistComponent,
    SpecialistItemComponent,
    SpecialistsComponent,
    SpecialistListComponent,
    SpecialistListItemComponent
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
    SpecialistService,
    DataService
  ]
})
export class SpecialistModule { }
