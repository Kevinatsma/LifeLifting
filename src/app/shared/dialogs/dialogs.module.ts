import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material.module';
import { MatDialogModule } from '@angular/material';
import { AddSpecialistDialogComponent } from './add-specialist-dialog/add-specialist-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';

@NgModule({
  declarations: [
    AddSpecialistDialogComponent,
    ConfirmDialogComponent,
    AddUserDialogComponent,
    AddSpecialistDialogComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    MatDialogModule
  ],
  exports: [
    AddSpecialistDialogComponent,
    ConfirmDialogComponent,
    AddUserDialogComponent
  ],
  entryComponents: [
    AddSpecialistDialogComponent,
    ConfirmDialogComponent,
    AddUserDialogComponent
  ]
})
export class DialogsModule { }
