import { Component, OnInit, Inject, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Mealplan } from '../mealplan.model';
import { User } from './../../user/user.model';
import { UserService } from 'src/app/user/user.service';
import { take } from 'rxjs/operators';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as _ from 'lodash';

@Component({
  selector: 'app-print-mealplan',
  templateUrl: './print-mealplan.component.html',
  styleUrls: ['./print-mealplan.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PrintMealplanComponent implements OnInit {
  @ViewChild('pageOne') pageOne: ElementRef;
  @ViewChild('pageTwo') pageTwo: ElementRef;
  @ViewChild('back') back: ElementRef;
  @ViewChild('next') next: ElementRef;
  mealplan: Mealplan;
  creationDate: Date;
  client: User;
  specialist: User;

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
               private userService: UserService,
               @Inject(MAT_DIALOG_DATA) public data: any) {
                this.mealplan = data.mealplan;
                this.client = data.client;
                this.mealTimes = data.mealplan.mealTimes;
                this.creationDate = data.mealplan.creationDate.toString();
                this.getSpecialistUser(data.mealplan);
              }

  ngOnInit() {
    this.pdf = new jsPDF('p', 'mm', 'a4');
  }

  getSpecialistUser(mealplan: Mealplan) {
    const userId = _.get(mealplan, 'specialistID');
    if (userId?.length) {
      const user$ = this.userService.getUserDataByID(userId);
      user$.pipe(take(1)).subscribe((user: User) => this.specialist = user);
    }
  }

  saveAsPDF() {
    const fileName  = `Mealplan ${this.mealplan.mealplanName}.pdf`;
    const elToExport = document.getElementById('page-one');
    html2canvas(elToExport, {scale: 6})
      .then(canvas => {
        const imgWidth = 195;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const contentDataURL = canvas.toDataURL('image/jpeg');
        this.pdf.addImage(contentDataURL, 'JPEG', 7.5, 0, imgWidth, imgHeight);
      });

    const elToExportTwo = document.getElementById('page-two');
    html2canvas(elToExportTwo, {scale: 6})
      .then(canvas => {
        const imgWidth = 195;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const contentDataURL = canvas.toDataURL('image/jpeg');
        this.pdf.addPage();
        this.pdf.addImage(contentDataURL, 'JPEG', 7.5, 0, imgWidth, imgHeight);
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
