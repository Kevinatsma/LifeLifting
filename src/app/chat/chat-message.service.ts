import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthService } from './../core/auth/auth.service';
import { Message } from './message.model';
import { Observable } from 'rxjs';
import { Thread } from './thread.model';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { NullAstVisitor } from '@angular/compiler';
import { ChatThreadService } from './chat-thread.service';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ChatMessageService {
  messagesCollection: AngularFirestoreCollection<Message>;
  messageDoc: AngularFirestoreDocument<Message>;
  threadDoc: AngularFirestoreDocument<Thread>;
  messages: Observable<Message[]>;

  constructor( private auth: AuthService,
               private afs: AngularFirestore,
               public route: ActivatedRoute) { }

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
      timestamp: new Date()
    };
    return this.afs.collection(`chats/${channelID}/messages`).add(data)
    .then(() => {
      console.log('Message sent!');
      this.updateThread(channelID);
    })
    .catch(error => console.log(error.message));
  }

  updateThread(channelID) {
    const data = {
      lastUpdated: new Date().toDateString()
    };
    this.threadDoc = this.afs.doc<Thread>(`chats/${channelID}`);
    this.threadDoc.update(data);
  }
}
