import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { User } from './../../user/user.model';
import { AuthService } from './../../core/auth/auth.service';
import { Router } from '@angular/router';
import { ClientService } from './../../clients/client.service';

@Component({
  selector: 'app-dashboard-top-nav',
  templateUrl: './dashboard-top-nav.component.html',
  styleUrls: ['./dashboard-top-nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardTopNavComponent implements OnInit {
  @Input() user: User;

  constructor( private auth: AuthService,
               public router: Router,
               private clientService: ClientService
               ) { }

  ngOnInit() {
  }

  editUser(user) {
    const url = `dashboard/clients/${user.uid}`;
    this.router.navigate([url]);
    return this.clientService.editShow = true;
  }

  signOut() {
    this.auth.signOut();
  }

}
