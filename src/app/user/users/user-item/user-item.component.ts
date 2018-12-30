import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { User } from '../../user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {
  @Input() user: User;
  aboutExtended = false;
  reviewsVisible = false;


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

}
