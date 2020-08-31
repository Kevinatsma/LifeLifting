import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-display-text-dialog',
  templateUrl: './display-text-dialog.component.html',
  styleUrls: ['./display-text-dialog.component.scss']
})
export class DisplayTextDialogComponent implements OnInit {

  constructor( public dialog: MatDialog,
               @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
