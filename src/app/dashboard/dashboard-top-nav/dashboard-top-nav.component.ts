import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/user/user.model';

@Component({
  selector: 'app-dashboard-top-nav',
  templateUrl: './dashboard-top-nav.component.html',
  styleUrls: ['./dashboard-top-nav.component.scss']
})
export class DashboardTopNavComponent implements OnInit {
  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
