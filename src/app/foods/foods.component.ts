import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { AddFoodDialogComponent } from '../shared/dialogs/add-food-dialog/add-food-dialog.component';
import { Food } from './food.model';
import { FoodService } from './food.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.scss']
})
export class FoodsComponent implements OnInit, OnDestroy {
  foods: Food[];
  foods$: Subscription;
  searchFoods: Food[];
  searchActive = false;

  constructor( public location: Location,
               private foodService: FoodService,
               public dialog: MatDialog,
               public cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.foods$ =  this.foodService.getFoods().subscribe(foods => {
      this.foods = foods;
    });
  }

  ngOnDestroy() {
    this.foods$.unsubscribe();
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

  onChangeSearch(e) {
    const searchInput = e.target.value.toLowerCase();

    // Show correct user list
    this.searchActive = e.target.value !== '';
    this.cdr.detectChanges();

    // Reset search array
    this.searchFoods = [];

    // Filter objects on display name and push matches to search array
    this.foods.forEach(obj => {
      if (obj.productName.toLowerCase().includes(`${searchInput}`)) {
        this.searchFoods.push(<Food>obj);
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
