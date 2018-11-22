import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserListItemComponent } from './user-list-item/user-list-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UserListComponent, UserListItemComponent]
})
export class UserModule { }
