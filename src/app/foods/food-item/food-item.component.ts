import { Component, OnInit, Input } from '@angular/core';
import { Food } from '../../foods/food.model';

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.scss']
})
export class FoodItemComponent implements OnInit {
  @Input() food: Food;

  constructor() { }

  ngOnInit() {
  }

}
