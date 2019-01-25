import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GuidelineService } from '../guideline.service';
import { Specialist } from '../../specialists/specialist.model';
import { SpecialistService } from '../../specialists/specialist.service';
import { Guideline } from '../guideline.model';
import { User } from './../../user/user.model';
import { UserService } from './../../user/user.service';


@Component({
  selector: 'app-guideline-detail',
  templateUrl: './guideline-detail.component.html',
  styleUrls: ['./guideline-detail.component.scss', './../guideline-list-item/guideline-list-item.component.scss']
})
export class GuidelineDetailComponent implements OnInit {
  guideline: Guideline;
  specialist: Specialist;
  aboutExtended = false;
  reviewsVisible = true;
  client: User;

  // specialist = Observable<Specialist>;

  constructor( private cdr: ChangeDetectorRef,
               public router: Router,
               public route: ActivatedRoute,
               private userService: UserService,
               public guidelineService: GuidelineService,
               public specialistService: SpecialistService,
               public location: Location) {
    this.aboutExtended = false;
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.guidelineService.getGuidelineDataById(id).subscribe(guideline => {
      this.guideline = guideline;
      this.userService.getUserDataByID(this.guideline.clientID).subscribe(user => this.client = user);
    });
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
    return this.guidelineService.editShow;
  }

  toggleEdit() {
    this.guidelineService.toggleEdit();
  }

  // Control buttons

  // linkToPrevious(guideline) {
  //   const productID = guideline.productID - 1;
  //   const url = `dashboard/guidelines/${productID}`;
  //   this.router.navigate([url]);
  //   this.guidelineService.getGuidelineDataById(productID).subscribe(a => (this.guideline = a));
  // }

  // linkToNext(guideline) {
  //   const productID = guideline.clientID + 1;
  //   console.log(productID);
  //   const url = `dashboard/guidelines/${productID}`;
  //   this.router.navigate([url]);
  //   this.guidelineService.getGuidelineDataById(productID).subscribe(a => (this.guideline = a));
  // }
}
