import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Specialist } from '../specialist.model';
import { ActivatedRoute } from '@angular/router';
import { SpecialistService } from '../specialist.service';


@Component({
  selector: 'app-specialist-detail',
  templateUrl: './specialist-detail.component.html',
  styleUrls: ['./specialist-detail.component.scss']
})
export class SpecialistDetailComponent implements OnInit {
  specialist: Specialist;
  aboutExtended = false;
  reviewsVisible = true;
  editShow: boolean;


  // specialist = Observable<Specialist>;

  constructor( private cdr: ChangeDetectorRef,
               public route: ActivatedRoute,
               public specialistService: SpecialistService,
               public location: Location) {
    this.aboutExtended = false;
  }

  ngOnInit() {
    this.getSpecialist();
    this.editShow = this.specialistService.editShow;
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

  showEdit() {
    return this.editShow = true;
  }

  hideEdit() {
    return this.editShow = false;
  }

  openReviews() {
    this.reviewsVisible = true;
    this.cdr.detectChanges();
  }

  closeReviews() {
    this.reviewsVisible = false;
    this.cdr.detectChanges();
  }

  // Back Button

  goBack() {
    return this.location.back();
  }
}
