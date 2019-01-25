import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { AddGuideDialogComponent } from '../shared/dialogs/add-guide-dialog/add-guide-dialog.component';

@Component({
  selector: 'app-guidelines',
  templateUrl: './guidelines.component.html',
  styleUrls: ['./guidelines.component.scss']
})
export class GuidelinesComponent implements OnInit {

  constructor( public location: Location,
               public dialog: MatDialog) { }

  ngOnInit() {
  }

  // openDialog() {
  //   // Set data for Dialog
  //   this.dialog.open(AddGuideDialogComponent, {
  //     data: {
  //       uid: this.auth.user.uid;
  //     }
  //   });
  // }

  goBack() {
    this.location.back();
  }
}
