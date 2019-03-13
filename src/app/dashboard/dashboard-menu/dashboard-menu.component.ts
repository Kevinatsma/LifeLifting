import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../core/auth/auth.service';

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.scss']
})
export class DashboardMenuComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
