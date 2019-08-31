import { Component, OnInit, Input } from '@angular/core';
import { openClose } from './../../../core/animations/open-close.animation';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ChooseMealplanDialogComponent } from '../../../shared/dialogs/choose-mealplan-dialog/choose-mealplan-dialog.component';
import { DashboardService } from '../../dashboard.service';
import { User } from './../../../user/user.model';

@Component({
  selector: 'app-client-menu',
  animations: [
    openClose
  ],
  templateUrl: './client-menu.component.html',
  styleUrls: ['./../dashboard-menu.component.scss']
})
export class ClientMenuComponent {
  @Input() user: User;
  linksOpened = false;

  constructor( private dialog: MatDialog,
               private router: Router,
               private dashboardService: DashboardService) {
                  setTimeout(() => {
                    this.linksOpened = this.user.roles.client;
                  });
               }

  toggle() {
    this.linksOpened = !this.linksOpened;
  }

  closeMenu() {
    this.dashboardService.toggleSideNav();
  }

  openMealChooseDialog() {
    this.dialog.open(ChooseMealplanDialogComponent, {
      data: {
      },
      panelClass: 'mealplan-choose-dialog'
    });
  }

}
