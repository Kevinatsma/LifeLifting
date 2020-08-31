import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmDialogComponent implements OnInit {

  constructor(public matDialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
