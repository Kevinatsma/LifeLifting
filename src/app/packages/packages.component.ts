import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddPackageDialogComponent } from './../shared/dialogs/add-package-dialog/add-package-dialog.component';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {

  constructor( public location: Location,
               public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog() {
    // Set data for Dialog
    this.dialog.open(AddPackageDialogComponent, {
      panelClass: 'add-package-dialog'
    });
  }

  goBack() {
    this.location.back();
  }
}