import { Component, OnInit, Input } from '@angular/core';
import { Specialist } from '../specialist.model';

@Component({
  selector: 'app-specialist-list-item',
  templateUrl: './specialist-list-item.component.html',
  styleUrls: ['./specialist-list-item.component.scss']
})
export class SpecialistListItemComponent implements OnInit {
  @Input() specialist: Specialist;
  constructor() { }

  ngOnInit() {
  }

}
