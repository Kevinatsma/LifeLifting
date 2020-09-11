import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventRequestComponent } from './event-request/event-request.component';
import { EventRequestListComponent } from './event-request/event-request-list/event-request-list.component';
import { EventRequestListItemComponent } from './event-request/event-request-list-item/event-request-list-item.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    EventRequestComponent,
    EventRequestListComponent,
    EventRequestListItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    EventRequestComponent
  ]
})
export class RequestModule { }
