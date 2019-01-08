import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodService } from '../food.service';
import { Food } from '../food.model';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss']
})
export class FoodListComponent implements OnInit {
  packages: Observable<Food[]>;

  constructor( private foodService: FoodService) { }

  ngOnInit() {
    this.packages = this.foodService.getPackages();
  }

}
