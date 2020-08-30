import { Injectable, OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable, Subject, Subscription } from 'rxjs';
import { Thread } from './thread.model';
import { Message } from './message.model';

import { AuthService } from './../core/auth/auth.service';
import { ChatMessageService } from './chat-message.service';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';

@Injectable()
export class ChatThreadService implements OnDestroy {
  threadsCollection: AngularFirestoreCollection<Thread>;
  threadDoc: AngularFirestoreDocument<Thread>;
  user: User;
  user$: Subscription;
  targetUser: User;
  targetUser$: Subscription;
  threadExists: boolean;
  requestedThread: string;
  reverseRequestedThread: string;
  thread: Observable<Thread>;
  thread$: Subscription;
  threads: Observable<Thread[]>;
  showThread: Subject<boolean> = new Subject;
  activeThreadID: Subject<string> = new Subject;

  constructor(
    private router: Router,
    private afs: AngularFirestore,
    private auth: AuthService,
    private messageService: ChatMessageService,
    private userService: UserService
  ) {
    this.getUser();
  }

  ngOnDestroy() {
    this.user$.unsubscribe();
    this.targetUser$.unsubscribe();
  }

  getUser() {
    const id = this.auth.currentUserId;
    this.user$ = this.userService.getUserDataByID(id).subscribe(user => {
      this.user = user;
    });
  }

  getTargetUser(profileId) {
    this.targetUser$ = this.userService.getUserDataByID(profileId).subscribe(targetUser => {
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
          this.getExistingThread(doc);
        } else {
          console.log('no such doc...');
          this.afs.collection(`chats`).doc(`${this.reverseRequestedThread}`).ref.get()
            .then((reverseThread) => {
              if (reverseThread.exists) {
                this.getExistingThread(doc);
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

  getExistingThread(doc) {
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
        creatorPhoto: this.user.photoURL,
        creatorUID: creatorID
      },
      target: {
        targetPhoto: targetUser.photoURL,
        targetName: targetUser.displayName,
        targetUID: targetUser.uid
      },
      members: [ profileID, creatorID ],
      unreadMessages: 0,
    };

    const threadPath = `chats/${id}`;
    this.messageService.getMessages(`${id}`);
    this.afs.doc(threadPath).set(data, { merge: true })
    .then(() => this.router.navigate([`chat/chat-detail/${id}`]));
  }

  getThreads() {
    const uid  =  this.auth.currentUserId;
    this.threadsCollection = this.afs.collection('chats', ref =>
      ref.where('members', 'array-contains', `${uid}`)
      .orderBy('lastUpdated', 'desc'));
    this.threads = this.threadsCollection.valueChanges();
    return this.threads;
  }

  getThread(profileId) {
    this.threadDoc = this.afs.doc<Thread>(`chats/${profileId}`);
    this.thread = this.threadDoc.valueChanges();
    return this.thread;
  }

  updateThread(id, data) {
    this.threadDoc = this.afs.doc<Thread>(`chats/${id}`);
    this.threadDoc.update(data);
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
    query.forEach(doc => {
      console.log(`Deleting: ${doc.ref}`);
      batch.delete(doc.ref);
    });
    batch.commit().then(() => {
      this.afs.doc(`chats/${threadId}`).delete();
    });
  }
}
