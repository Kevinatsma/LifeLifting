import { Component, OnInit, Input } from '@angular/core';
import { Thread } from './../thread.model';
import { ChatThreadService } from './../chat-thread.service';
import { User } from 'src/app/user/user.model';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrls: ['./chat-thread.component.scss']
})
export class ChatThreadComponent implements OnInit {
  @Input() thread: Thread;
  user: User;
  currentUser: boolean;

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

  checkUser() {
    this.getUser();
    if (this.thread.creator) {
      console.log('true');
      return this.currentUser = true;
    } else {
      console.log('false');
      return this.currentUser = false;
    }
  }

  delete(threadId) {
    this.threadService.deleteThread(threadId);
  }
}
