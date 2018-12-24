import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/user/user.model';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-dashboard-top-nav',
  templateUrl: './dashboard-top-nav.component.html',
  styleUrls: ['./dashboard-top-nav.component.scss']
})
export class DashboardTopNavComponent implements OnInit {
  @Input() user: User;

  constructor( private auth: AuthService) { }

  ngOnInit() {
  }

  signOut() {
    this.auth.signOut();
  }

}
