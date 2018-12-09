import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-specialists',
  templateUrl: './specialists.component.html',
  styleUrls: ['./specialists.component.scss']
})
export class SpecialistsComponent implements OnInit {

  constructor(public location: Location) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }
}
