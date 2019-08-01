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
  @ViewChild('pageOne') pageOne: ElementRef;
  @ViewChild('pageTwo') pageTwo: ElementRef;
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
  canvasTwo: any;
  pdfTwo: any;
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

    html2canvas(this.pageOne.nativeElement, {
      letterRendering: true,
      scale: quality
    })
    .then(canvas => {
      this.canvas = canvas;
      console.log(this.canvas);
      this.pdf = new jsPDF('p', 'px', 'a4');
      this.docWidth = this.pdf.internal.pageSize.getWidth();
    })
    .then(() => {
      this.pageOne.nativeElement.style.width = `${this.docWidth}px`;
    });

    html2canvas(this.pageTwo.nativeElement, {
      letterRendering: true,
      scale: quality
    })
    .then(canvas => {
      this.canvasTwo = canvas;
      this.pdfTwo = new jsPDF('p', 'px', 'a4');
    })
    .then(() => {
      this.pageTwo.nativeElement.style.width = `${this.docWidth}px`;
      console.log(this.pageOne);
      console.log(this.pageTwo);
    });
  }

  saveAsPDF() {
    const filename  = `Mealplan ${this.mealplan.mealplanName}.pdf`;
    const height = this.pdf.internal.pageSize.getHeight();
    const heightTwo = this.pdfTwo.internal.pageSize.getHeight();
    this.pdf.addImage(this.canvas.toDataURL('imgData'), 'JPEG', 0, 0, this.docWidth, height);
    this.pdf.addPage(this.docWidth, heightTwo);
    this.pdf.addImage(this.canvas.toDataURL('imgData'), 'JPEG', 0, 0, this.docWidth, heightTwo);
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
