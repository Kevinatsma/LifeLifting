import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRequestComponent } from './user-request/user-request.component';
import { EventRequestComponent } from './event-request/event-request.component';

@NgModule({
  declarations: [UserRequestComponent, EventRequestComponent],
  imports: [
    CommonModule
  ]
})
export class UserRequestModule { }
