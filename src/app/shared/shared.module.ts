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
import { UtilService } from './services/util.service';
import { RoundNumberPipe } from './pipes/round-number.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { LanguagePickerComponent } from './language-picker/language-picker.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
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
    RoundNumberPipe,
    LanguagePickerComponent,
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
    TranslateModule,
    LanguagePickerComponent,
  ],
  providers: [
    FileUploadService,
    UtilService
  ]
})
export class SharedModule { }
