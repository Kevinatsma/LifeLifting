import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { User } from './../../user.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../user.service';
import { Specialist } from './../../../specialists/specialist.model';
import { SpecialistService } from './../../../specialists/specialist.service';
import { ChatThreadService } from './../../../chat/chat-thread.service';


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
               public threadService: ChatThreadService,
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

  // chat() {
  //   const profileId = this.route.snapshot.paramMap.get('id');
  //   console.log('hello');
  //   return this.threadService.createThread(profileId)
  //     .then(() => console.log('Thread Created!'))
  //     .catch(error => console.log(error.message));
  // }

  test() {
    console.log('test');
  }

  // Back Button

  goBack() {
    return this.location.back();
  }
}
