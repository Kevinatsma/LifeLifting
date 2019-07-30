import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-print-meal-thursday',
  templateUrl: './print-meal-thursday.component.html',
  styleUrls: ['./../print-day.scss']
})
export class PrintMealThursdayComponent implements OnInit {
  @Input() thursdayMeals: any;

  constructor() { }

  ngOnInit() {
  }

}
