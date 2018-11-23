import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserListComponent } from './user-list/user-list.component';
import { UserListItemComponent } from './user-list-item/user-list-item.component';
import { SignupComponent } from '../core/auth/signup/signup.component';
import { LoginComponent } from './login/login.component';
import { CoreModule } from './../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../core/auth/auth.service';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    CoreModule,
    SharedModule
  ],
  declarations: [
    UserListComponent,
    UserListItemComponent,
    SignupComponent,
    LoginComponent
  ],
  providers: [
    AuthService
  ]
})
export class UserModule { }
