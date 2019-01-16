import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Specialist } from '../specialist.model';
import { ActivatedRoute } from '@angular/router';
import { SpecialistService } from '../specialist.service';
import { Observable } from 'rxjs';
import { ChatThreadService } from './../../chat/chat-thread.service';


@Component({
  selector: 'app-specialist-detail',
  templateUrl: './specialist-detail.component.html',
  styleUrls: ['./specialist-detail.component.scss']
})
export class SpecialistDetailComponent implements OnInit {
  specialist: Specialist;
  aboutExtended = false;
  reviewsVisible = true;


  // specialist = Observable<Specialist>;

  constructor( private cdr: ChangeDetectorRef,
               public route: ActivatedRoute,
               public specialistService: SpecialistService,
               private threadService: ChatThreadService,
               public location: Location) {
    this.aboutExtended = false;
  }

  ngOnInit() {
    this.getSpecialist();
  }

  getSpecialist() {
    const id = this.route.snapshot.paramMap.get('id');
    this.specialistService.getSpecialistData(id).subscribe(specialist => (this.specialist = specialist));
  }

  aboutExtendedOpen() {
    this.aboutExtended = true;
    this.cdr.detectChanges();
  }

  aboutExtendedClose() {
    this.aboutExtended = false;
    this.cdr.detectChanges();
  }

  // Like this to avoid State Changed Error
  // Open/closers

  get editShow(): boolean {
    return this.specialistService.editShow;
  }

  toggleEdit() {
      this.specialistService.toggleEdit();
  }

  openReviews() {
    this.reviewsVisible = true;
    this.cdr.detectChanges();
  }

  closeReviews() {
    this.reviewsVisible = false;
    this.cdr.detectChanges();
  }


  chat() {
    const profileId = this.specialist.uid;
    return this.threadService.createThread(profileId);
  }

  // Back Button

  goBack() {
    return this.location.back();
  }
}
