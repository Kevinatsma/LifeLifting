import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AddSpecialistDialogComponent } from './../../shared/dialogs/add-specialist-dialog/add-specialist-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-specialists',
  templateUrl: './specialists.component.html',
  styleUrls: ['./specialists.component.scss']
})
export class SpecialistsComponent implements OnInit {

  constructor( public location: Location,
               public dialog: MatDialog) { }

  ngOnInit() {
  }
  openDialog() {
    // Set data for Dialog
    this.dialog.open(AddSpecialistDialogComponent, {
      panelClass: 'add-user-dialog'
    });
  }

  goBack() {
    this.location.back();
  }
}
