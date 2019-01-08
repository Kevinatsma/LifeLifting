import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
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
  @Input() i;
  detailOpen = false;

  constructor( public router: Router,
               public dialog: MatDialog,
               private foodService: FoodService) { }

  ngOnInit() {
  }

  deletePackageDialog(llPackage) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        packageID: llPackage.packageID,
        packageTitle: llPackage.packageTitle,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result === true) {
        console.log('i"m being called');
        const id = llPackage.packageID;
        this.foodService.deletePackage(id);
      } else if (result === false) {
        return null;
      }
    });
  }

  editPackage(llPackage) {
    const url = `dashboard/packages/${llPackage.packageID}`;
    this.router.navigate([url]);
    return this.foodService.editShow = true;
  }


  linkToChild(llPackage) {
    const url = `dashboard/packages/${llPackage.packageID}`;
    this.router.navigate([url]);
  }

}
