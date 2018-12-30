import { Component, OnInit } from '@angular/core';
import { Specialist } from '../specialist.model';
import { Observable } from 'rxjs';
import { SpecialistService } from '../specialist.service';

@Component({
  selector: 'app-specialist-list',
  templateUrl: './specialist-list.component.html',
  styleUrls: ['./specialist-list.component.scss']
})
export class SpecialistListComponent implements OnInit {
  specialists: Observable<Specialist[]>;

  constructor( private specialistService: SpecialistService) { }

  ngOnInit() {
    this.specialists = this.specialistService.getSpecialists();
  }

}
