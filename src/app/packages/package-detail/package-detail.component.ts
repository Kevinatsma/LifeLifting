import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { User } from '../../user/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PackageService } from '../package.service';
import { Observable } from 'rxjs';
import { Specialist } from 'src/app/specialists/specialist.model';
import { SpecialistService } from 'src/app/specialists/specialist.service';
import { Package } from '../package.model';


@Component({
  selector: 'app-user-detail',
  templateUrl: './package-detail.component.html',
  styleUrls: ['./package-detail.component.scss']
})
export class PackageDetailComponent implements OnInit {
  package: Package;
  specialist: Specialist;
  aboutExtended = false;
  reviewsVisible = true;


  // specialist = Observable<Specialist>;

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

  getPackage() {
    const id = this.route.snapshot.paramMap.get('id');
    this.packageService.getPackageData(id).subscribe(llPackage => (this.package = llPackage));
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
    this.packageService.getPackageData(packageID).subscribe(a => (this.package = a));
  }

  linkToNext(llPackage) {
    const packageID = llPackage.packageID + 1;
    const url = `dashboard/packages/${packageID}`;
    this.router.navigate([url]);
    this.packageService.getPackageData(packageID).subscribe(a => (this.package = a));
  }
}
