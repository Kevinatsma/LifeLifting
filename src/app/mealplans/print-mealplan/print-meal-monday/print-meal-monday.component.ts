import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-print-meal-monday',
  templateUrl: './print-meal-monday.component.html',
  styleUrls: ['./../print-day.scss']
})
export class PrintMealMondayComponent implements OnInit {
  @Input() mondayMeals: any;

  constructor() { }

  ngOnInit() {
  }

}
