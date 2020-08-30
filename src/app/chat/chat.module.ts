import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ChatDetailComponent } from './chat-detail/chat-detail.component';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { ChatMessagesComponent } from './chat-messages/chat-messages.component';
import { ChatThreadsComponent } from './chat-threads/chat-threads.component';
import { ChatThreadComponent } from './chat-thread/chat-thread.component';
import { ChatMessageService } from './chat-message.service';
import { ChatThreadService } from './chat-thread.service';
import { AuthGuard } from '../core/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'chat',
    component: ChatThreadsComponent,
    canActivate: [AuthGuard],
    data: {state: 'chat'},
    children: [
      {path: '', redirectTo: 'chat', pathMatch: 'full'},
      {path: 'chat-detail', redirectTo: 'chat-detail/:id', pathMatch: 'full'},
      {path: 'chat-detail/:id', component: ChatDetailComponent}
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),
  ],
  exports: [
    ChatInputComponent,
    ChatMessageComponent,
    ChatMessagesComponent,
    ChatThreadComponent,
    ChatThreadsComponent,
    RouterModule
  ],
  declarations: [
    ChatDetailComponent,
    ChatInputComponent,
    ChatMessageComponent,
    ChatMessagesComponent,
    ChatThreadsComponent,
    ChatThreadComponent
  ],
  providers: [ChatMessageService, ChatThreadService]
})
export class ChatModule { }
