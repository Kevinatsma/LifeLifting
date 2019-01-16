import { Component, OnInit, Input } from '@angular/core';
import { Thread } from './../thread.model';
import { ChatThreadService } from './../chat-thread.service';
import { User } from './../../user/user.model';
import { AuthService } from './../../core/auth/auth.service';
import { UserService } from './../../user/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrls: ['./chat-thread.component.scss']
})
export class ChatThreadComponent implements OnInit {
  @Input() thread: Thread;
  user: User;
  isCreator: boolean;
  param: string;
  id: any;

  constructor( private threadService: ChatThreadService,
               public auth: AuthService,
               private userService: UserService,
               private route: ActivatedRoute) {
                // this.checkCreator();
                console.log(this.thread);
               }

  ngOnInit() {
  }

  checkCreator() {
    // console.log(this.thread);
    const id = this.auth.currentUserId;
    this.userService.getUserDataByID(id).subscribe(user => {
      this.user = user;
      // console.log(`${this.thread.creator.creatorID} - ${user.uid}`);
      if (this.thread.creator.creatorID === this.user.uid) {
        // console.log('true');
        return this.isCreator = true;
      } else {
        // console.log('false');
        return this.isCreator = false;
      }
    });
  }

  // checkUser() {
  //   const uid = this.auth.currentUserId;
  //   if (this.thread.creator.creatorID && uid) {
  //     this.isCreator = this.thread.creator.creatorID === uid;
  //   }
  // }

  delete(threadId) {
    this.threadService.deleteThread(threadId);
  }
}
