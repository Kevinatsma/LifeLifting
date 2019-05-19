import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { GuidelineListItemComponent } from './guideline-list-item/guideline-list-item.component';
import { GuidelineListComponent } from '../guidelines/guideline-list/guideline-list.component';
import { EditGuidelineComponent } from '../guidelines/edit-guideline/edit-guideline.component';

import { SharedModule } from '../shared/shared.module';
import { GuidelineService } from './guideline.service';
import { GuidelinesComponent } from './guidelines.component';
import { GuidelineDetailComponent } from './guideline-detail/guideline-detail.component';

@NgModule({
  declarations: [
    GuidelineListItemComponent,
    GuidelineListComponent,
    EditGuidelineComponent,
    GuidelinesComponent,
    GuidelineDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    GuidelineListItemComponent,
    GuidelineListComponent,
    EditGuidelineComponent,
    GuidelinesComponent,
    GuidelineDetailComponent
  ],
  providers: [
    GuidelineService
  ]
})
export class GuidelinesModule { }
