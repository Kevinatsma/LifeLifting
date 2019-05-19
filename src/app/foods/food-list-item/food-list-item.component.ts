import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from './../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { FoodService } from './../food.service';
import { Food } from '../food.model';

@Component({
  selector: 'app-food-list-item',
  templateUrl: './food-list-item.component.html',
  styleUrls: ['./food-list-item.component.scss']
})
export class FoodListItemComponent implements OnInit {
  @Input() food: Food;
  @Input() amount;
  @Input() prep;
  @Input() i;
  detailOpen = false;

  constructor( public router: Router,
               public dialog: MatDialog,
               private foodService: FoodService) { }

  ngOnInit() {
  }

  deleteFoodDialog(food) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        productID: food.productID,
        productName: food.productName,
      },
      panelClass: 'confirm-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const id = food.productID;
        this.foodService.deleteFood(id);
      } else if (result === false) {
        return null;
      }
    });
  }

  editFood(food) {
    const url = `dashboard/foods/${food.productID}`;
    this.router.navigate([url]);
    return this.foodService.editShow = true;
  }


  linkToChild(food) {
    const url = `dashboard/foods/${food.productID}`;
    this.router.navigate([url]);
  }

}
