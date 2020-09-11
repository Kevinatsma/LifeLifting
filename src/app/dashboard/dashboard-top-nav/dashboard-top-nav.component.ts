import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { User } from './../../user/user.model';
import { AuthService } from './../../core/auth/auth.service';
import { Router } from '@angular/router';
import { ClientService } from './../../clients/client.service';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard-top-nav',
  templateUrl: './dashboard-top-nav.component.html',
  styleUrls: ['./dashboard-top-nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardTopNavComponent implements OnInit {
  @Input() user: User;
  replacementURL = './../../../../assets/img/icons/user-no-photo.svg';

  constructor( private auth: AuthService,
               public router: Router,
               private clientService: ClientService,
               private dashboardService: DashboardService) { }

  ngOnInit() {
  }

  editUser(user) {
    const url = `dashboard/clients/${user.uid}`;
    this.router.navigate([url]);
    return this.clientService.editShow = true;
  }

  toggleSideNav() {
    this.dashboardService.toggleSideNav();
  }

  signOut() {
    this.auth.signOut();
  }
}
