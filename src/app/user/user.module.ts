import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from './../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../core/auth/auth.service';
import { UserService } from './user.service';
import { RouterModule } from '@angular/router';
import { SignUpModule } from './sign-up/sign-up.module';

// Components

import { UsersComponent } from './users/users.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserListItemComponent } from './users/user-list-item/user-list-item.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CoreModule,
    SharedModule,
    SignUpModule
  ],
  exports: [
    SignUpModule,
    UserListComponent,
    UserListItemComponent,
    UsersComponent,
    UserDetailComponent,
    EditUserComponent
  ],
  declarations: [
    UserListComponent,
    UserListItemComponent,
    UsersComponent,
    UserDetailComponent,
    EditUserComponent
  ],
  providers: [
    AuthService,
    UserService
  ]
})
export class UserModule { }
