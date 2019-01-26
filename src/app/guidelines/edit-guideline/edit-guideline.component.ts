import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GuidelineService } from '../guideline.service';
import { Location } from '@angular/common';
import { SpecialistService } from '../../specialists/specialist.service';
import { Guideline } from '../guideline.model';
import { AuthService } from './../../core/auth/auth.service';
import { User } from 'src/app/user/user.model';

@Component({
  selector: 'app-edit-guideline',
  templateUrl: './edit-guideline.component.html',
  styleUrls: [
    './../guideline-detail/guideline-detail.component.scss',
    './../guideline-list-item/guideline-list-item.component.scss',
    './edit-guideline.component.scss'
  ]
})
export class EditGuidelineComponent implements OnInit, OnDestroy {
  @Input() guideline: Guideline;
  @Input() client: User;
  aboutExtended = false;
  reviewsVisible = true;

  // Form
  editGuidelineForm: FormGroup;
  downloadURL: string | any;
  url: any;

  constructor( private fb: FormBuilder,
               private auth: AuthService,
               private guidelineService: GuidelineService,
               public specialistService: SpecialistService,
               public location: Location) {
               }

  ngOnInit() {
    this.editGuidelineForm = this.fb.group({
      productName: '' || this.guideline.productName,
      productCategory: '' || this.guideline.productCategory,
      amount: '' || this.guideline.portion.amount,
      unit: '' || this.guideline.portion.unit,
      preperations: '' || this.guideline.preparations,
    });
    this.url = `guidelines`;
  }

  // Getters

  get editShow(): boolean {
    return this.guidelineService.editShow;
  }

  toggleEdit() {
      this.guidelineService.toggleEdit();
  }

  ngOnDestroy() {
    this.guidelineService.editShow = false;
  }

  editGuideline() {
    const data = {
      lastEdited: new Date(),
      productName: this.editGuidelineForm.get('productName').value || this.guideline.productName,
      productCategory: this.editGuidelineForm.get('productCategory').value || this.guideline.productCategory,
    };
    this.guidelineService.updateGuideline(this.guideline.productID, data);
    this.toggleEdit();
  }

  receiveDownloadURL($event) {
    return this.downloadURL = $event;
  }

    // Back Button

    goBack() {
      return this.location.back();
    }

}
