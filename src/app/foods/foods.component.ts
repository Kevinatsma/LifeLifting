import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { AddFoodDialogComponent } from '../shared/dialogs/add-food-dialog/add-food-dialog.component';
import { Food } from './food.model';
import { FoodService } from './food.service';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.scss']
})
export class FoodsComponent implements OnInit {
  foods: Food[];

  constructor( public location: Location,
               private foodService: FoodService,
               public dialog: MatDialog) { }

  ngOnInit() {
    this.foodService.getFoods().subscribe(foods => {
      this.foods = foods;
    });
  }

  openDialog() {
    // Set data for Dialog
    this.dialog.open(AddFoodDialogComponent, {
      data: {
        foods: this.foods
      },
      panelClass: 'add-food-dialog'
    });
  }

  goBack() {
    this.location.back();
  }
}
