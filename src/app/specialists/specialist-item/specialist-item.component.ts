import { Component, OnInit, Input } from '@angular/core';
import { Specialist } from '../specialist.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-specialist-item',
  templateUrl: './specialist-item.component.html',
  styleUrls: ['./specialist-item.component.scss']
})
export class SpecialistItemComponent implements OnInit {
  @Input() specialist: Specialist;

  // specialist = Observable<Specialist>;

  constructor() { }

  ngOnInit() {
  }

}
