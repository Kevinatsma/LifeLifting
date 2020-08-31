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
                
              }

  ngOnInit() {
  }

  saveAsPDF() {
    const fileName  = `Mealplan ${this.mealplan.mealplanName}.pdf`;
    const elToExport = document.getElementById('page-one');  //Id of the table
    html2canvas(elToExport)
      .then(canvas => {
        const imgWidth = 208;   
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const contentDataURL = canvas.toDataURL('image/png');
        const position = 0;  
        this.pdf = new jsPDF('p', 'mm', 'a4');
        this.pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      });
    const elToExportTwo = document.getElementById('page-two');  //Id of the table
    html2canvas(elToExportTwo)
      .then(canvas => {
        const imgWidth = 208;   
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const contentDataURL = canvas.toDataURL('image/png');
        const position = 0;  
        this.pdf.addPage();
        this.pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      })
      .then(_ => {
        this.pdf.save(fileName);
      });
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
