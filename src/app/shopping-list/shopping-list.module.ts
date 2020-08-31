import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListDetailComponent } from './shopping-list-detail.component';
import { ShoppingListService } from './shopping-list.service';
import { SharedModule } from '../shared/shared.module';
import { PrintShoppingListComponent } from './print-shopping-list/print-shopping-list.component';

@NgModule({
  declarations: [
    ShoppingListDetailComponent,
    PrintShoppingListComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ShoppingListDetailComponent
  ],
  providers: [ShoppingListService]
})
export class ShoppingListModule { }
