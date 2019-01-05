import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material.module';
import { MatDialogModule } from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { DataService } from './../data/data.service';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { AddClientDialogComponent } from './add-client-dialog/add-client-dialog.component';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    AddUserDialogComponent,
    AddClientDialogComponent,
    FileUploadComponent
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
    AddUserDialogComponent,
    AddClientDialogComponent,
    FileUploadComponent
  ],
  entryComponents: [
    ConfirmDialogComponent,
    AddUserDialogComponent,
    AddClientDialogComponent
  ],
  providers: [
    DataService
  ]
})
export class DialogsModule { }
