import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ChatDetailComponent } from './chat-detail/chat-detail.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatService } from './chat.service';

@NgModule({
  declarations: [
    ChatDetailComponent,
    ChatListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ChatDetailComponent,
    ChatListComponent
  ],
  providers: [
    ChatService
  ]
})
export class ChatModule { }
