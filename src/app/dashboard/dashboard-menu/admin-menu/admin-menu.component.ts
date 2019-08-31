import { Component, OnInit, Input } from '@angular/core';
import { openClose } from './../../../core/animations/open-close.animation';
import { DashboardService } from '../../dashboard.service';
import { User } from './../../../user/user.model';

@Component({
  selector: 'app-admin-menu',
  animations: [
    openClose
  ],
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./../dashboard-menu.component.scss']
})
export class AdminMenuComponent {
  @Input() user: User;
  linksOpened = false;

  constructor( private dashboardService: DashboardService) {
    setTimeout(() => {
      this.linksOpened = this.user.roles.admin;
    });
   }

  toggle() {
    this.linksOpened = !this.linksOpened;
  }

  closeMenu() {
    this.dashboardService.toggleSideNav();
  }

}
