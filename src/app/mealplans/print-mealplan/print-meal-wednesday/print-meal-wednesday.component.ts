import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-print-meal-wednesday',
  templateUrl: './print-meal-wednesday.component.html',
  styleUrls: ['./../print-day.scss']
})
export class PrintMealWednesdayComponent implements OnInit {
  @Input() wednesdayMeals: any;

  constructor() { }

  ngOnInit() {
  }

}
