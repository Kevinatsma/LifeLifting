import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from './../core/auth/auth.service';
import { Message } from './message.model';
import { Observable, Subscription } from 'rxjs';
import { Thread } from './thread.model';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ChatMessageService implements OnDestroy {
  messagesCollection: AngularFirestoreCollection<Message>;
  messageDoc: AngularFirestoreDocument<Message>;
  threadDoc: AngularFirestoreDocument<Thread>;
  thread: Thread;
  thread$: Subscription;
  messages: Observable<Message[]>;

  constructor( private afs: AngularFirestore,
               public route: ActivatedRoute) { }

  ngOnDestroy() {
    this.thread$.unsubscribe();
  }

  getMessages(channelID) {
    this.messagesCollection = this.afs.collection(
      `chats/${channelID}/messages`,
      ref => ref.orderBy('timestamp', 'asc')
    );
    return this.messages = this.messagesCollection.valueChanges();
  }

  sendMessage(
    channelID: string,
    photoURL: string,
    sender: string,
    senderId: string,
    content: string
  ) {
    const data = {
      photoURL,
      sender,
      senderId,
      content,
      timestamp: new Date().toString()
    };
    return this.afs.collection(`chats/${channelID}/messages`).add(data)
    .then(() => {
      console.log('Message sent!');
      this.updateThread(channelID, senderId);
    })
    .catch(error => console.log(error.message));
  }

  updateThread(channelID, senderId) {
    this.getThread(channelID);
    setTimeout(()  => {
      const data = {
        lastUpdated: new Date(),
        unreadMessages: this.thread.unreadMessages + 1,
        lastSenderId: senderId
      };
      this.threadDoc = this.afs.doc<Thread>(`chats/${channelID}`);
      this.threadDoc.update(data);
    }, 500);
  }

  getThread(channelID) {
    const threadDoc = this.afs.doc<Thread>(`chats/${channelID}`);
    this.thread$ = threadDoc.valueChanges().subscribe(thread => {
      this.thread = thread;
    });
    return this.thread;
  }
}
