import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GuidelineService } from '../guideline.service';
import { Location } from '@angular/common';
import { SpecialistService } from '../../specialists/specialist.service';
import { Guideline } from '../guideline.model';
import { AuthService } from 'src/app/core/auth/auth.service';

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
  aboutExtended = false;
  reviewsVisible = true;

  // Form
  editProductForm: FormGroup;
  downloadURL: string | any;
  url: any;

  constructor( private fb: FormBuilder,
               private auth: AuthService,
               private guidelineService: GuidelineService,
               public specialistService: SpecialistService,
               public location: Location) {
               }

  ngOnInit() {
    this.editProductForm = this.fb.group({
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

  editProduct() {
    const data = {
      productName: this.editProductForm.get('productName').value || this.guideline.productName,
      productCategory: this.editProductForm.get('productCategory').value || this.guideline.productCategory,
    };
    const uid = this.auth.currentUserId;
    this.guidelineService.updateGuideline(this.guideline.productID, uid, data);
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
