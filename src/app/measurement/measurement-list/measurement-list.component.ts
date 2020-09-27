import { Component, Input } from '@angular/core';
import { Measurement } from '../measurement.model';
import { User } from './../../user/user.model';

@Component({
  selector: 'app-measurement-list',
  templateUrl: './measurement-list.component.html',
  styleUrls: ['./measurement-list.component.scss']
})

export class MeasurementListComponent {
  @Input() public measurements: Measurement[];
  @Input() public client: User;
}