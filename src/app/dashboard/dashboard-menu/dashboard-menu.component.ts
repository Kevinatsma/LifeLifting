import { Component, OnDestroy } from '@angular/core';
import { AuthService } from './../../core/auth/auth.service';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.scss']
})
export class DashboardMenuComponent implements OnDestroy {

  constructor( public auth: AuthService,
               private dashboardService: DashboardService
             ) {
  }

  ngOnDestroy() {
  }

  closeMenu() {
    this.dashboardService.toggleSideNav();
  }
}
