import { Component, OnInit, Input } from 'node_modules/@angular/core';
import { FirstConsultation } from '../first-consultation.model';
import { User } from '../../user/user.model';

@Component({
  selector: 'app-follow-up-list',
  templateUrl: './follow-up-list.component.html',
  styleUrls: ['./follow-up-list.component.scss']
})

export class FirstConsultationListComponent {
  @Input() public followUps: FirstConsultation[];
  @Input() public client: User;

}
