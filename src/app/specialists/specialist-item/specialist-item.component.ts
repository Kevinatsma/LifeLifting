import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Specialist } from '../specialist.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-specialist-item',
  templateUrl: './specialist-item.component.html',
  styleUrls: ['./specialist-item.component.scss']
})
export class SpecialistItemComponent implements OnInit {
  @Input() specialist: Specialist;
  @Output() specialistToShow = new EventEmitter();
  aboutExtended = false;
  reviewsVisible = false;

  // Toggles
  showSpecialist = false;

  // specialist = Observable<Specialist>;

  constructor( private cdr: ChangeDetectorRef) {
    this.aboutExtended = false;
  }

  ngOnInit() {
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
  openReviews() {
    this.reviewsVisible = true;
    this.cdr.detectChanges();
  }

  closeReviews() {
    this.reviewsVisible = false;
    this.cdr.detectChanges();
  }

  // Toggles
  toggleSpecialist(specialist) {
    this.specialistToShow  = specialist;
    this.showSpecialist = true;
  }

  closeSpecialist() {
    this.showSpecialist = false;
  }

}
