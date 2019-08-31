import { Location } from '@angular/common';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PackageService } from '../package.service';
import { Specialist } from './../../specialists/specialist.model';
import { SpecialistService } from './../../specialists/specialist.service';
import { Package } from '../package.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-user-detail',
  templateUrl: './package-detail.component.html',
  styleUrls: ['./package-detail.component.scss']
})
export class PackageDetailComponent implements OnInit, OnDestroy {
  package: Package;
  package$: Subscription;
  prevPackage$: Subscription;
  nextPackage$: Subscription;
  specialist: Specialist;
  specialist$: Subscription;
  aboutExtended = false;
  reviewsVisible = true;

  constructor( private cdr: ChangeDetectorRef,
               public router: Router,
               public route: ActivatedRoute,
               public packageService: PackageService,
               public specialistService: SpecialistService,
               public location: Location) {
    this.aboutExtended = false;
  }

  ngOnInit() {
    this.getPackage();
  }

  ngOnDestroy() {
    this.package$.unsubscribe();
    this.prevPackage$.unsubscribe();
    this.nextPackage$.unsubscribe();
    if (this.specialist$ !== undefined) { this.specialist$.unsubscribe(); }
  }

  getPackage() {
    const id = this.route.snapshot.paramMap.get('id');
    this.package$ = this.packageService.getPackageData(id).subscribe(llPackage => (this.package = llPackage));
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
    return this.packageService.editShow;
  }

  toggleEdit() {
    this.packageService.toggleEdit();
  }

  openReviews() {
    this.reviewsVisible = true;
    this.cdr.detectChanges();
  }

  closeReviews() {
    this.reviewsVisible = false;
    this.cdr.detectChanges();
  }

  // Control buttons

  goBack() {
    return this.location.back();
  }

  linkToPrevious(llPackage) {
    const packageID = llPackage.packageID - 1;
    const url = `dashboard/packages/${packageID}`;
    this.router.navigate([url]);
    this.prevPackage$ = this.packageService.getPackageData(packageID).subscribe(a => (this.package = a));
  }

  linkToNext(llPackage) {
    const packageID = llPackage.packageID + 1;
    const url = `dashboard/packages/${packageID}`;
    this.router.navigate([url]);
    this.nextPackage$ = this.packageService.getPackageData(packageID).subscribe(a => (this.package = a));
  }
}
