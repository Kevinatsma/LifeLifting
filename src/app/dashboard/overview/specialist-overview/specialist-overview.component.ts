import { Component, OnInit, Input } from '@angular/core';
import { User } from './../../../user/user.model';

@Component({
  selector: 'app-specialist-overview',
  templateUrl: './specialist-overview.component.html',
  styleUrls: ['./specialist-overview.component.scss']
})
export class SpecialistOverviewComponent implements OnInit {
  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
