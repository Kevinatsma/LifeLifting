import { Component, OnInit, Inject, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Mealplan } from '../mealplan.model';
import * as html2canvas from 'html2canvas';
import { User } from './../../user/user.model';
const jsPDF = require('jspdf');

@Component({
  selector: 'app-print-mealplan',
  templateUrl: './print-mealplan.component.html',
  styleUrls: ['./print-mealplan.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PrintMealplanComponent implements OnInit {
  @ViewChild('mealplanEl') mealplanEl: ElementRef;
  mealplan: Mealplan;
  client: User;

  mealTimes = [];
  days = [
    { dayValue: 'Monday' },
    { dayValue: 'Tuesday' },
    { dayValue: 'Wednesday' },
    { dayValue: 'Thursday' },
    { dayValue: 'Friday' }
  ];

  pageOneActive = true;
  pageTwoActive = false;
  canvas: any;
  pdf: any;
  docWidth: any;

  constructor( public dialog: MatDialog,
               @Inject(MAT_DIALOG_DATA) public data: any) {
                this.mealplan = data.mealplan;
                this.client = data.client;
                this.mealTimes = data.mealplan.mealTimes;
                setTimeout(() => this.drawCanvas());
              }

  ngOnInit() {
  }

  drawCanvas() {
    const quality = 3;

    html2canvas(this.mealplanEl.nativeElement, {
      letterRendering: true,
      scale: quality
    })
    .then(canvas => {
      this.canvas = canvas;
      this.pdf = new jsPDF('p', 'px', 'a4');
      this.docWidth = this.pdf.internal.pageSize.getWidth();
    })
    .then(() => {
      this.mealplanEl.nativeElement.style.width = `${this.docWidth}px`;
    });
  }

  saveAsPDF() {
    const filename  = `Mealplan ${this.mealplan.mealplanName}.pdf`;
    const height = this.pdf.internal.pageSize.getHeight();
    this.pdf.addImage(this.canvas.toDataURL('imgData'), 'JPEG', 0, 0, this.docWidth, height);
    this.pdf.save(filename);
  }

  togglePage() {
    this.pageOneActive = !this.pageOneActive;
    this.pageTwoActive = !this.pageTwoActive;
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
