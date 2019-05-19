import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListDetailComponent } from './shopping-list-detail.component';
import { ShoppingListService } from './shopping-list.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ShoppingListDetailComponent],
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
