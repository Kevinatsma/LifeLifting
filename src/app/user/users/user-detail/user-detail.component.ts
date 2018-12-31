import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { User } from './../../user.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../user.service';
import { Observable } from 'rxjs';
import { Specialist } from 'src/app/specialists/specialist.model';
import { SpecialistService } from 'src/app/specialists/specialist.service';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: User;
  specialist: Specialist;
  aboutExtended = false;
  reviewsVisible = true;


  // specialist = Observable<Specialist>;

  constructor( private cdr: ChangeDetectorRef,
               public route: ActivatedRoute,
               public userService: UserService,
               public specialistService: SpecialistService,
               public location: Location) {
    this.aboutExtended = false;
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getUserDataByID(id).subscribe(user => {
      this.user = user;
      const sID  = this.user.specialist;
      console.log(sID);
      this.getSpecialist(sID);
    });
  }

  getSpecialist(sID: string) {
    this.specialistService.getSpecialistData(sID).subscribe(specialist => (this.specialist = specialist));
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
    return this.userService.editShow;
  }

  toggleEdit() {
    this.userService.toggleEdit();
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
