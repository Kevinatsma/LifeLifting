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
import { AddPackageDialogComponent } from './add-package-dialog/add-package-dialog.component';
import { AddFoodDialogComponent } from './add-food-dialog/add-food-dialog.component';
import { FileUploadProductComponent } from './../file-upload/file-upload-product/file-upload-product.component';
import { FileUploadExerciseComponent } from './../file-upload/file-upload-exercise/file-upload-exercise.component';
import { AddExerciseDialogComponent } from './add-exercise-dialog/add-exercise-dialog.component';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    AddUserDialogComponent,
    AddClientDialogComponent,
    FileUploadComponent,
    FileUploadProductComponent,
    FileUploadExerciseComponent
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
    FileUploadComponent,
    FileUploadProductComponent,
    FileUploadExerciseComponent
  ],
  entryComponents: [
    ConfirmDialogComponent,
    AddUserDialogComponent,
    AddClientDialogComponent,
    AddPackageDialogComponent,
    AddFoodDialogComponent,
    AddExerciseDialogComponent
  ],
  providers: [
    DataService
  ]
})
export class DialogsModule { }
