import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from './../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../core/auth/auth.service';
import { UserService } from './user.service';
import { RouterModule } from '@angular/router';
import { SignUpModule } from './sign-up/sign-up.module';

// Components
import { UserListComponent } from './user-list/user-list.component';
import { UserListItemComponent } from './user-list-item/user-list-item.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CoreModule,
    SharedModule,
    SignUpModule
  ],
  exports: [
    SignUpModule
  ],
  declarations: [
    UserListComponent,
    UserListItemComponent
  ],
  providers: [
    AuthService,
    UserService
  ]
})
export class UserModule { }
