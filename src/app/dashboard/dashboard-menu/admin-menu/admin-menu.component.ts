import { Component, OnInit } from '@angular/core';
import { openClose } from './../../../core/animations/open-close.animation';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-admin-menu',
  animations: [
    openClose
  ],
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./../dashboard-menu.component.scss']
})
export class AdminMenuComponent implements OnInit {
  linksOpened = false;

  constructor( private dashboardService: DashboardService) { }

  ngOnInit() {
  }

  toggle() {
    this.linksOpened = !this.linksOpened;
  }

  closeMenu() {
    this.dashboardService.toggleSideNav();
  }

}
