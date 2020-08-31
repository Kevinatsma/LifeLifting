import { Component, OnInit, Inject, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  @ViewChild('shoppingList', {static: false}) shoppingListEl: ElementRef;
  shoppingListItems: Array<any>;
  mealplan: Mealplan;

  canvas: any;
  pdf: any;
  docWidth: any;

  constructor( public dialog: MatDialog,
               @Inject(MAT_DIALOG_DATA) public data: any) {
                this.shoppingListItems = data.shoppingListItems;
                this.mealplan = data.mealplan;
              }

  ngOnInit() {
  }

  saveAsPDF() {
    const fileName  = `Shopping list ${this.mealplan.mealplanName}.pdf`;
    const elToExport = document.getElementById('page-one');  //Id of the table
    html2canvas(elToExport)
      .then(canvas => {
        const imgWidth = 208;   
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const contentDataURL = canvas.toDataURL('image/png');
        const position = 0;  
        this.pdf = new jsPDF('p', 'mm', 'a4');
        this.pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      })
      .then(_ => {
        this.pdf.save(fileName);
      });
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
