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
  threadExists: boolean;
  requestedThread: string;
  reverseRequestedThread: string;
  thread: Observable<Thread>;
  threads: Observable<Thread[]>;

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

  createThread(profileID) {
    this.requestedThread = this.auth.currentUserId + '_' + profileID;
    this.reverseRequestedThread = profileID + '_' + this.auth.currentUserId;
    this.afs.collection(`chats`).doc(`${this.requestedThread}`).ref.get()
      .then((doc) => {
        if (doc.exists) {
          this.getExistingThread();
        } else {
          console.log('no such doc...');
          this.afs.collection(`chats`).doc(`${this.reverseRequestedThread}`).ref.get()
            .then((reverseThread) => {
              if (reverseThread.exists) {
                this.getExistingThread();
              } else {
                this.threadExists = false;
                return this.userService.getUserDataByID(profileID).subscribe(user => {
                  this.targetUser = user;
                  this.startThread(profileID);
                });
              }
            })
            .catch(function(error) {
              console.log('Error', error);
            });
        }
      })
      .catch(function(error) {
          console.log('Error getting document:', error);
      });
  }

  getExistingThread() {
    console.log('doc exists!');
    this.threadExists = true;
    this.messageService.getMessages(`${this.requestedThread}`);
    this.router.navigate([`chat/chat-detail/${this.requestedThread}`]);
  }

  startThread(profileID) {
    const creatorID = this.user.uid;
    const id = `${creatorID}_${profileID}`;
    const targetUser = this.targetUser;

    const data = {
      id: id,
      lastMessage: null,
      lastUpdated: new Date(),
      creator: {
        creatorName: this.user.displayName || this.user.email,
        creatorPhoto: this.user.photoURL
      },
      target: {
        targetPhoto: targetUser.photoURL,
        targetName: targetUser.displayName
      },
      members: { [profileID]: true, [creatorID]: true },
    };

    const threadPath = `chats/${id}`;
    this.afs.doc(threadPath).set(data, { merge: true })
    .then(() => this.router.navigate([`chat/chat-detail/${id}`]));
  }

  getThreads() {
    this.threadsCollection = this.afs.collection('chats', ref => ref.where(`members.${this.auth.currentUserId}`, '==', true));
    this.threads = this.threadsCollection.valueChanges();
    return this.threads;
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
