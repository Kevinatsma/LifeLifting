import { Component, OnInit, Input } from '@angular/core';
import { FirstConsultation } from '../first-consultation.model';
import { User } from '../../user/user.model';

@Component({
  selector: 'app-first-consultation-list',
  templateUrl: './first-consultation-list.component.html',
  styleUrls: ['./first-consultation-list.component.scss']
})

export class FirstConsultationListComponent {
  @Input() public firstConsultations: FirstConsultation[];
  @Input() public client: User;

}
