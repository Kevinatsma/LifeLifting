import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReviewListItemComponent } from './review-list-item/review-list-item.component';
import { ReviewsService } from './reviews.service';
import { MaterialModule } from '../shared/material.module';
// import { ReviewEditComponent } from './review-edit/review-edit.component';

@NgModule({
  declarations: [
    ReviewListItemComponent,
    // ReviewEditComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ReviewListItemComponent,
    // ReviewEditComponent
  ],
  providers: [
    ReviewsService,
  ]
})
export class ReviewsModule { }
