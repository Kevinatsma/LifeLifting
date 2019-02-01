import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GuidelineService } from '../guideline.service';
import { Location } from '@angular/common';
import { SpecialistService } from '../../specialists/specialist.service';
import { Guideline } from '../guideline.model';
import { AuthService } from './../../core/auth/auth.service';
import { User } from './../../user/user.model';
import { Exercise } from 'src/app/exercises/exercise.model';

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
  @Input() exercise: Exercise;
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
      guidelineName: '' || this.guideline.guidelineName,
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
      guidelineName: this.editGuidelineForm.get('guidelineName').value || this.guideline.guidelineName,
    };
    this.guidelineService.updateGuideline(this.guideline.guidelineID, data);
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
