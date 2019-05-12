import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Package } from '../../packages/package.model';
import { User } from './../../user/user.model';

@Component({
  selector: 'app-package-item',
  templateUrl: './package-item.component.html',
  styleUrls: ['./package-item.component.scss']
})
export class PackageItemComponent implements OnInit {
  @Input() package: Package;
  @Input() user: User;
  aboutExtended = false;
  hasReadMore = false;

  constructor( private cdr: ChangeDetectorRef) {
    this.aboutExtended = false;
    setTimeout(() => this.checkReadMore(this.package), 800);
   }

  ngOnInit() {
  }

  checkReadMore(lPackage) {
    if (lPackage.packageDescription.length > 50) {
      this.hasReadMore = true;
    } else {
      this.hasReadMore = false;
    }
  }

  aboutExtendedToggle() {
    this.aboutExtended = !this.aboutExtended;
    this.cdr.detectChanges();
  }
}
