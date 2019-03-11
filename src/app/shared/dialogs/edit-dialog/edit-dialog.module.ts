import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditDialogComponent } from './edit-dialog.component';
import { ReviewEditComponent } from './review-edit/review-edit.component';
import { ReviewsService } from './../../../reviews/reviews.service';
import { SharedModule } from '../../shared.module';

@NgModule({
  declarations: [
    ReviewEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ReviewEditComponent
  ],
  providers: [
    ReviewsService
  ]

})
export class EditDialogModule { }
