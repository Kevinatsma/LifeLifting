import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material.module';
import { MatDialogModule } from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    AddUserDialogComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    MatDialogModule
  ],
  exports: [
    ConfirmDialogComponent,
    AddUserDialogComponent
  ],
  entryComponents: [
    ConfirmDialogComponent,
    AddUserDialogComponent
  ]
})
export class DialogsModule { }
