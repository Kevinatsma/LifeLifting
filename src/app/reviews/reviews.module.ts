import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewListItemComponent } from './review-list-item/review-list-item.component';
import { ReviewsService } from './reviews.service';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [ReviewListItemComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ReviewListItemComponent
  ],
  providers: [
    ReviewsService,
  ]
})
export class ReviewsModule { }
