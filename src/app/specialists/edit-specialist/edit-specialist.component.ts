import { Component, OnInit, Input } from '@angular/core';
import { Specialist } from '../specialist.model';

@Component({
  selector: 'app-edit-specialist',
  templateUrl: './edit-specialist.component.html',
  styleUrls: ['./edit-specialist.component.scss']
})
export class EditSpecialistComponent implements OnInit {
  @Input() specialist: Specialist;
  constructor() { }

  ngOnInit() {
  }

}
