import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './user.model';
import { AuthService } from '../core/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userCol: AngularFirestoreCollection<User>;
  user: User;
  users: Observable<User[]>;
  userDoc: AngularFirestoreDocument<User>;

  constructor( private afs: AngularFirestore,
               private auth: AuthService) {
    this.userCol = this.afs.collection(`users`);
    this.users = this.getUsers();
  }

  getUsers() {
    this.users = this.userCol.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
    return this.users;
  }

  // getUserData(id) {
  //   this.userDoc = this.afs.doc(`users/${id}`);
  //   return this.userDoc.valueChanges();
  // }

  getUserData() {
    this.afs.collection(`users`).doc(`${this.auth.currentUserId}`).ref.get()
      .then((doc) => {
        if (doc.exists) {
            // Write doc data to user variable
            const user = doc.data() as User;
            return this.user = user;
        } else {
            console.log('No such document!');
        }
      })
      .catch(function(error) {
          console.log('Error getting document:', error);
      });
    return this.user;
  }

  updateUser(id, data) {
    this.userDoc = this.afs.doc<User>(`users/${id}`);
    this.userDoc.update(data);
 }

  deleteUser(user: User) {
    this.userDoc = this.afs.doc('users/' + user.uid);
    this.userDoc.delete();
  }
}
