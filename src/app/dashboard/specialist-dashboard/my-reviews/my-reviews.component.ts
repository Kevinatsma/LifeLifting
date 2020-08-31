import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.component.html',
  styleUrls: ['./my-reviews.component.scss']
})
export class MyReviewsComponent implements OnInit {

  constructor( public location: Location,
               public dialog: MatDialog) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }
}
