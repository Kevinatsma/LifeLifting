import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { DataModule } from './data/data.module';
import { FileUploadService } from './file-upload/file-upload.service';
import { FileSizePipe } from './pipes/file-size.pipe';
import { DropZoneDirective } from './directives/drop-zone.directive';
import { FileUploadButtonComponent } from './file-upload/file-upload-button/file-upload-button.component';
import { ExerciseListItemComponent } from '../exercises/exercise-list-item/exercise-list-item.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileUploadExerciseComponent } from './file-upload/file-upload-exercise/file-upload-exercise.component';
import { FileUploadProductComponent } from './file-upload/file-upload-product/file-upload-product.component';
import { ReviewsModule } from '../reviews/reviews.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    DataModule,
    ReviewsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    FileSizePipe,
    DropZoneDirective,
    FileUploadComponent,
    FileUploadExerciseComponent,
    FileUploadProductComponent,
    FileUploadButtonComponent,
    ExerciseListItemComponent,
    LoadingSpinnerComponent,
  ],
  exports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DataModule,
    ReviewsModule,
    FileUploadComponent,
    FileUploadExerciseComponent,
    FileUploadProductComponent,
    FileUploadButtonComponent,
    ExerciseListItemComponent,
    LoadingSpinnerComponent,
  ],
  providers: [
    FileUploadService
  ]
})
export class SharedModule { }
