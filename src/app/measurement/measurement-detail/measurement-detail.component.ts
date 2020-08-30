import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Measurement } from '../measurement.model';

@Component({
  selector: 'app-measurement-detail',
  templateUrl: './measurement-detail.component.html',
  styleUrls: ['./measurement-detail.component.scss']
})
export class MeasurementDetailComponent implements OnInit {
  measurement: Measurement;

  constructor( public dialog: MatDialog,
               @Inject(MAT_DIALOG_DATA) public data: any) {
                 this.measurement = data.measurement;
                }

  ngOnInit() {
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
