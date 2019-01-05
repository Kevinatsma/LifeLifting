import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './user.model';
import { AuthService } from '../core/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userCol: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  userDoc: AngularFirestoreDocument<User>;
  user: Observable<User>;
  editShow: boolean;
  editStateChange: Subject<boolean> = new Subject<boolean>();

  constructor( private afs: AngularFirestore,
               private auth: AuthService) {
    this.userCol = this.afs.collection(`users`);
    this.users = this.getUsers();
    this.editStateChange.subscribe((value) => {
      this.editShow = value;
    });
  }


  toggleEdit() {
    this.editStateChange.next(!this.editShow);
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

  getUserDataByID(uid) {
    this.userDoc = this.afs.doc<User>(`users/${uid}`);
    this.user = this.userDoc.valueChanges();
    return this.user;
  }

  updateUser(uid, data) {
    this.userDoc = this.afs.doc<User>(`users/${uid}`);
    this.userDoc.update(data);
  }

  deleteUser(id) {
    this.userDoc = this.afs.doc<User>(`users/${id}`);
    this.userDoc.delete();
  }
}
