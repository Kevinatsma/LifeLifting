import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-print-meal-friday',
  templateUrl: './print-meal-friday.component.html',
  styleUrls: ['./../print-day.scss']
})
export class PrintMealFridayComponent implements OnInit {
  @Input() fridayMeals: any;

  constructor() { }

  ngOnInit() {
  }

}
