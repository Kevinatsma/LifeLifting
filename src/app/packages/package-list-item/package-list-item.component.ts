import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from './../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { PackageService } from './../package.service';
import { Package } from '../package.model';

@Component({
  selector: 'app-package-list-item',
  templateUrl: './package-list-item.component.html',
  styleUrls: ['./package-list-item.component.scss']
})
export class PackageListItemComponent implements OnInit {
  @Input() package: Package;
  @Input() i;
  detailOpen = false;

  constructor( public router: Router,
               public dialog: MatDialog,
               private packageService: PackageService) { }

  ngOnInit() {
  }

  deletePackageDialog(llPackage) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        packageID: llPackage.packageID,
        packageTitle: llPackage.packageTitle,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result === true) {
        console.log('i"m being called');
        const id = llPackage.packageID;
        this.packageService.deletePackage(id);
      } else if (result === false) {
        return null;
      }
    });
  }

  editPackage(llPackage) {
    const url = `dashboard/packages/${llPackage.packageID}`;
    this.router.navigate([url]);
    return this.packageService.editShow = true;
  }


  linkToChild(llPackage) {
    const url = `dashboard/packages/${llPackage.packageID}`;
    this.router.navigate([url]);
  }

}
