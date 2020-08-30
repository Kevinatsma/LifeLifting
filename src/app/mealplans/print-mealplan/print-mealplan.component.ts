import { Component, OnInit, Inject, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Mealplan } from '../mealplan.model';
import html2canvas from 'html2canvas';
import { User } from './../../user/user.model';
const jsPDF = require('jspdf');

@Component({
  selector: 'app-print-mealplan',
  templateUrl: './print-mealplan.component.html',
  styleUrls: ['./print-mealplan.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PrintMealplanComponent implements OnInit {
  @ViewChild('pageOne', {static: false}) pageOne: ElementRef;
  @ViewChild('pageTwo', {static: false}) pageTwo: ElementRef;
  @ViewChild('back', {static: false}) back: ElementRef;
  @ViewChild('next', {static: false}) next: ElementRef;
  @ViewChild('canvasDisplayTwo', {static: false}) canvasDisplayTwo: ElementRef;
  mealplan: Mealplan;
  creationDate: Date;
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
  pageTwoActive = true;
  canvas: any;
  pdf: any;
  canvasTwo: any;
  pdfTwo: any;
  docWidth = '445';

  constructor( public dialog: MatDialog,
               @Inject(MAT_DIALOG_DATA) public data: any) {
                this.mealplan = data.mealplan;
                this.client = data.client;
                this.mealTimes = data.mealplan.mealTimes;
                this.creationDate = data.mealplan.creationDate.toString();
                setTimeout(() => this.drawCanvas());
              }

  ngOnInit() {
  }

  drawCanvas() {
    const quality = 4;

    if (this.pageOne) {
      html2canvas(this.pageOne.nativeElement, {
        useCORS: true,
        scale: quality
        // letterRendering: true
      })
      .then(canvas => {
        this.canvas = canvas;
        this.pdf = new jsPDF('p', 'px', 'a4');
      })
      .then(() => {
        this.pageOne.nativeElement.style.width = `${this.docWidth}px`;
      });
    }

    if (this.pageTwo) {
      html2canvas(this.pageTwo.nativeElement, {
        useCORS: true,
        scale: quality
        // letterRendering: true
      })
      .then(canvas => {
        this.canvasTwo = canvas;
        this.pdfTwo = new jsPDF('p', 'px', 'a4');
      })
      .then(() => {
        this.pageTwo.nativeElement.style.width = `${this.docWidth}px`;
      });
    }
  }

  saveAsPDF() {
    const filename  = `Mealplan ${this.mealplan.mealplanName}.pdf`;
    const height = this.pdf.internal.pageSize.getHeight();
    const heightTwo = this.pdfTwo.internal.pageSize.getHeight();
    this.pdf.addImage(this.canvas.toDataURL('imgData'), 'JPEG', 0, 0, 445, height);
    this.pdf.addPage('445px', heightTwo);
    this.pdf.addImage(this.canvasTwo.toDataURL('imgData'), 'JPEG', 0, 0, 445, heightTwo);
    this.pdf.save(filename);
  }

  togglePage() {
    this.pageOneActive = !this.pageOneActive;
    this.pageTwoActive = !this.pageTwoActive;

    if (this.pageOneActive) {
      this.back.nativeElement.style.opacity = 0;
      this.next.nativeElement.style.opacity = 1;
      this.pageOne.nativeElement.style.zIndex = 10;
      this.pageTwo.nativeElement.style.zIndex = 9;
    } else {
      this.back.nativeElement.style.opacity = 1;
      this.next.nativeElement.style.opacity = 0;
      this.pageOne.nativeElement.style.zIndex = 9;
      this.pageTwo.nativeElement.style.zIndex = 10;
    }
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
