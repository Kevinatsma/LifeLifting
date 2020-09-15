import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReviewListItemComponent } from './review-list-item/review-list-item.component';
import { ReviewsService } from './reviews.service';
import { MaterialModule } from '../shared/material.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ReviewListItemComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  exports: [
    ReviewListItemComponent
  ],
  providers: [
    ReviewsService,
  ]
})
export class ReviewsModule { }
