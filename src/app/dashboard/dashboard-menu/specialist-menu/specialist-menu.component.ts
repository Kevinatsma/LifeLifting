import { Component, OnInit, Input } from '@angular/core';
import { openClose } from './../../../core/animations/open-close.animation';
import { DashboardService } from '../../dashboard.service';
import { User } from './../../../user/user.model';

@Component({
  selector: 'app-specialist-menu',
  animations: [
    openClose
  ],
  templateUrl: './specialist-menu.component.html',
  styleUrls: ['./../dashboard-menu.component.scss']
})
export class SpecialistMenuComponent {
  @Input() user: User;
  linksOpened = true;

  constructor( private dashboardService: DashboardService) {
    setTimeout(() => {
      this.linksOpened = this.user.roles.specialist;
    });
   }

  toggle() {
    this.linksOpened = !this.linksOpened;
  }

  closeMenu() {
    this.dashboardService.toggleSideNav();
  }
}
