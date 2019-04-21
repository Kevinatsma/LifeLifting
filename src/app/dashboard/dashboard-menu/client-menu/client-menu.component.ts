import { Component, OnInit } from '@angular/core';
import { openClose } from './../../../core/animations/open-close.animation';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ChooseMealplanDialogComponent } from '../../../shared/dialogs/choose-mealplan-dialog/choose-mealplan-dialog.component';

@Component({
  selector: 'app-client-menu',
  animations: [
    openClose
  ],
  templateUrl: './client-menu.component.html',
  styleUrls: ['./../dashboard-menu.component.scss']
})
export class ClientMenuComponent implements OnInit {
  linksOpened = false;

  constructor( private dialog: MatDialog,
               private router: Router) { }

  ngOnInit() {
  }

  toggle() {
    this.linksOpened = !this.linksOpened;
  }


  openMealChooseDialog() {
    this.dialog.open(ChooseMealplanDialogComponent, {
      data: {
      },
      panelClass: 'mealplan-choose'
    });
  }

}
