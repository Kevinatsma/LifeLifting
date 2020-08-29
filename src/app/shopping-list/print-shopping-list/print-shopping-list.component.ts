import { Component, OnInit, Inject, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Mealplan } from './../../mealplans/mealplan.model';
import html2canvas from 'html2canvas';
const jsPDF = require('jspdf');

@Component({
  selector: 'app-print-shopping-list',
  templateUrl: './print-shopping-list.component.html',
  styleUrls: ['./print-shopping-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PrintShoppingListComponent implements OnInit {
  @ViewChild('shoppingList') shoppingListEl: ElementRef;
  shoppingListItems: Array<any>;
  mealplan: Mealplan;

  canvas: any;
  pdf: any;
  docWidth: any;

  constructor( public dialog: MatDialog,
               @Inject(MAT_DIALOG_DATA) public data: any) {
                this.shoppingListItems = data.shoppingListItems;
                this.mealplan = data.mealplan;
                setTimeout(() => this.drawCanvas());
              }

  ngOnInit() {
  }

  drawCanvas() {
    const quality = 4;

    html2canvas(this.shoppingListEl.nativeElement, {
      useCORS: true,
      scale: quality
    })
    .then(canvas => {
      this.canvas = canvas;
      this.pdf = new jsPDF('p', 'px', 'a4');
      this.docWidth = this.pdf.internal.pageSize.getWidth();
    })
    .then(() => {
      this.shoppingListEl.nativeElement.style.width = `${this.docWidth}px`;
    });
  }

  saveAsPDF() {
    const filename  = `Shopping list ${this.mealplan.mealplanName}.pdf`;
    const height = this.pdf.internal.pageSize.getHeight();
    this.pdf.addImage(this.canvas.toDataURL('imgData'), 'JPEG', 0, 0, this.docWidth, height);
    this.pdf.save(filename);
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
