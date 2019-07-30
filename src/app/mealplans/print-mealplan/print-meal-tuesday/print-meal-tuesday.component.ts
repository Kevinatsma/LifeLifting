import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-print-meal-tuesday',
  templateUrl: './print-meal-tuesday.component.html',
  styleUrls: ['./../print-day.scss']
})
export class PrintMealTuesdayComponent implements OnInit {
  @Input() tuesdayMeals: any;

  constructor() { }

  ngOnInit() {
  }

}
