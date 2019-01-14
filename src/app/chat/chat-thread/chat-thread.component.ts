import { Component, OnInit, Input } from '@angular/core';
import { Thread } from './../thread.model';
import { ChatThreadService } from './../chat-thread.service';
import { User } from './../../user/user.model';
import { AuthService } from './../../core/auth/auth.service';
import { UserService } from './../../user/user.service';

@Component({
  selector: 'app-chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrls: ['./chat-thread.component.scss']
})
export class ChatThreadComponent implements OnInit {
  @Input() thread: Thread;
  user: User;
  isCreator: boolean;

  constructor( private threadService: ChatThreadService,
               private auth: AuthService,
               private userService: UserService) {}

  ngOnInit() {
    this.checkUser();
  }

  getUser() {
    const id = this.auth.currentUserId;
    this.userService.getUserDataByID(id).subscribe(user => {
      this.user = user;
    });
  }

  // checkUser() {
  //   this.getUser();
  //   if (this.thread.creator) {
  //     console.log('true');
  //     return this.currentUser = true;
  //   } else {
  //     console.log('false');
  //     return this.currentUser = false;
  //   }
  // }

  checkUser() {
    const uid = this.auth.currentUserId;
    if (this.thread.creator.creatorID && uid) {
      this.isCreator = this.thread.creator.creatorID === uid;
    }
  }

  delete(threadId) {
    this.threadService.deleteThread(threadId);
  }
}
