import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRequestComponent } from './user-request/user-request.component';
import { EventRequestComponent } from './event-request/event-request.component';
import { EventRequestListComponent } from './event-request/event-request-list/event-request-list.component';
import { EventRequestListItemComponent } from './event-request/event-request-list-item/event-request-list-item.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    UserRequestComponent,
    EventRequestComponent,
    EventRequestListComponent,
    EventRequestListItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    UserRequestComponent,
    EventRequestComponent
  ],
  entryComponents: [
    EventRequestComponent
  ]
})
export class RequestModule { }
