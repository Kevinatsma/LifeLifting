import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthService } from './../core/auth/auth.service';
import { Message } from './message.model';
import { Observable } from 'rxjs';
import { Thread } from './thread.model';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ChatMessageService {
  messagesCollection: AngularFirestoreCollection<Message>;
  messageDoc: AngularFirestoreDocument<Message>;
  thread: Observable<Thread>;

  constructor( private auth: AuthService,
               private afs: AngularFirestore) { }

  getMessages(channelId) {
    this.messagesCollection = this.afs.collection(
      `chats/${channelId}/messages`,
      ref => ref.orderBy('timestamp', 'asc')
    );
    return this.messagesCollection.valueChanges();
  }

  sendMessage(
    channelId: string,
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
    return this.afs.collection(`chats/${channelId}/messages`).add(data)
    .then(() => console.log('Message Sent'))
    .catch(error => console.log(error.message));
  }
}
