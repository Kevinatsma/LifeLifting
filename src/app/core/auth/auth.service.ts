import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';

import { User, Roles } from './../../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User>;
  userData: User;
  authState: any = null;

  constructor( private afs: AngularFirestore,
               private afAuth: AngularFireAuth,
               private router: Router,
               private ngZone: NgZone) {

    // Get Auth data, then get Firestore User Document || null
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
    this.afAuth.authState.subscribe(data => this.authState = data);
  }

  // Auth Process

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user);
      })
      .then(() => {
        this.router.navigate(['dashboard']);
      })
      .catch(error => console.log(error.message));
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      roles: {
        member: true,
        specialist: false,
        admin: false
      },
      signupCompleted: false
    };
    return userRef.set(data, { merge: true });
  }

  updateUser(data, user) {
    console.log(user);
    console.log(data);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    return userRef.update(data);
  }

  setUserData(data, user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    return userRef.set(data, {merge: true})
    .then(() => {
      console.log('data updated');
    })
    .catch(error => {
      console.error(error.message);
      alert(error.message);
    });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : null;
  }

  emailSignIn(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(() => console.log('You have successfully signed in'))
      .then(() => {
        return this.user;
      })
      .then(() => {
        this.router.navigate(['dashboard']);
      })
      .catch(error => {
        alert(error.message);
        console.log(error.message);
      });
  }

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((credential) => {
        this.updateUserData(credential.user);
      })
      .then(() => console.log('Welcome, your account has been created!'))
      .then(user => {
        this.afAuth.auth.currentUser.sendEmailVerification()
          .then(() => console.log('We sent you an email verification'))
          .catch(error => console.log(error.message));
          return user;
      });
  }

  signOut() {
    this.afAuth.auth.signOut()
      .then(() => {
        this.router.navigate(['/']);
      }
    );
  }

  ///// Role-based Authorization //////

  subscriberRoles(user: User): boolean {
    const allowed = ['admin', 'editor', 'subscriber'];
    return this.checkAuthorization(user, allowed);
  }

  editorRoles(user: User): boolean {
    const allowed = ['admin', 'editor'];
    return this.checkAuthorization(user, allowed);
  }

  adminRoles(user: User): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }

  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) {
      return false;
    }
    for (const role of allowedRoles) {
      if ( user.roles[role] ) {
        return true;
      }
    }
    return false;
  }
}
