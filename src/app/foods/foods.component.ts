import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { AddFoodDialogComponent } from '../shared/dialogs/add-food-dialog/add-food-dialog.component';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.scss']
})
export class FoodsComponent implements OnInit {

  constructor( public location: Location,
               public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog() {
    // Set data for Dialog
    this.dialog.open(AddFoodDialogComponent, {

    });
  }

  goBack() {
    this.location.back();
  }
}
