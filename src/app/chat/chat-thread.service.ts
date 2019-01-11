import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs';

import { Thread } from './thread.model';
import { Message } from './message.model';

import { AuthService } from './../core/auth/auth.service';
import { ChatMessageService } from './chat-message.service';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';

@Injectable()
export class ChatThreadService {
  threadsCollection: AngularFirestoreCollection<Thread>;
  threadDoc: AngularFirestoreDocument<Thread>;
  user: User;
  targetUser: User;
  thread: Observable<Thread>;

  constructor(
    private router: Router,
    private afs: AngularFirestore,
    private auth: AuthService,
    private messageService: ChatMessageService,
    private userService: UserService
  ) {
    this.getUser();
  }

  getUser() {
    const id = this.auth.currentUserId;
    this.userService.getUserDataByID(id).subscribe(user => {
      this.user = user;
    });
  }

  getTargetUser(profileId) {
    this.userService.getUserDataByID(profileId).subscribe(targetUser => {
      this.targetUser = targetUser;
    });
    return this.targetUser;
  }

  async createThread(profileId) {
    const targetUser = this.getTargetUser(profileId);
    const currentUserId = this.auth.currentUserId;
    const id = `${currentUserId}_${profileId}`;
    const avatar = this.user.photoURL;
    const targetAvatar = '';
    const creator = this.user.displayName || this.user.email;
    const lastMessage = null;
    // const creator = this.auth.authState.displayName || this.auth.authState.email;
    // const lastMessage = null;
    const members = { [profileId]: true, [currentUserId]: true };

    const thread: Thread = { id, avatar, targetAvatar, creator, lastMessage, members };
    const threadPath = `chats/${id}`;

    await this.afs.doc(threadPath).set(thread, { merge: true })
    .then(() => this.router.navigate([`chat/chat-detail/${id}`]));
  }

  getThreads() {
    this.threadsCollection = this.afs.collection('chats', ref => ref.where(`members.${this.auth.currentUserId}`, '==', true));
    return this.threadsCollection.valueChanges();
  }

  getThread(profileId) {
    this.threadDoc = this.afs.doc<Thread>(`chats/${profileId}`);
    this.thread = this.threadDoc.valueChanges();
    return this.thread;
  }

  saveLastMessage(channelId, message) {
    const data = {
      lastMessage: message,
    };
    return this.afs.doc(`chats/${channelId}`).set(data, { merge: true });
  }

  async deleteThread(threadId: string) {
    const batch = this.afs.firestore.batch();
    const query = await this.afs.collection(`chats/${threadId}/messages`).ref.get();
    console.log(query);
    query.forEach(doc => {
      console.log(doc);
      console.log(`Deleting: ${doc.ref}`);
      batch.delete(doc.ref);
    });
    batch.commit().then(() => {
      this.afs.doc(`chats/${threadId}`).delete();
    });
  }
}
