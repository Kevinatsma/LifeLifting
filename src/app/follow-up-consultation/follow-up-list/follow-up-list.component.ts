import { Component, OnInit, Input } from '@angular/core';
import { FollowUpConsultation } from '../follow-up-consultation.model';
import { User } from '../../user/user.model';

@Component({
  selector: 'app-follow-up-list',
  templateUrl: './follow-up-list.component.html',
  styleUrls: ['./follow-up-list.component.scss']
})

export class FollowUpListComponent implements OnInit {
  @Input() public followUps: FollowUpConsultation[];
  @Input() public client: User;

  constructor() {
    setTimeout(() => console.log(this.followUps));
  }

  ngOnInit() {
  }

}
