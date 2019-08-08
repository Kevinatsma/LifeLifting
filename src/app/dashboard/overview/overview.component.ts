import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../core/auth/auth.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  constructor( public auth: AuthService) { }

  ngOnInit() {
  }

}
