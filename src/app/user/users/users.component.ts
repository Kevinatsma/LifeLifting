import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AddSpecialistDialogComponent } from 'src/app/shared/dialogs/add-specialist-dialog/add-specialist-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor( public location: Location,
               public dialog: MatDialog) { }

  ngOnInit() {
  }
  openDialog() {
    // Set data for Dialog
    this.dialog.open(AddSpecialistDialogComponent, {

    });
  }

  goBack() {
    this.location.back();
  }
}
