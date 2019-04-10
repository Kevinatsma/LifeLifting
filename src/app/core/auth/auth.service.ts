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

  googleSignUp() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthSignUp(provider);
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthSignUp(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user);
      })
      .then(() => {
        this.router.navigate(['dashboard']);
      })
      .catch(error => console.log(error.message));
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
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
        client: true,
        specialist: false,
        admin: false
      },
      status: {
        signUpCompleted: false,
        accepted: false,
      }
    };
    return userRef.set(data, { merge: true });
  }

  updateUser(data, user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    return userRef.update(data);
  }

  addUserData(data, user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    return userRef.set(data, {merge: true})
    .then(() => {
      console.log('data updated');
    })
    .catch(error => {
      console.error(error.message);
    });
  }

  setUserData(data, user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    return userRef.update(data)
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

  getUser() {
    return this.user.pipe(first()).toPromise();
  }

  addUser(email: string, password: string, formData: any) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then((credential) => {
      const data = {
        uid: credential.user.uid,
        displayName: formData.displayName,
        photoURL: formData.photoURL,
        roles: {
          client: true,
          specialist: false,
          admin: false
        },
        signUpCompleted: false,
        signUpDate: new Date(),
        email: formData.email
      };
      this.addUserData(data, credential.user);
    })
    .then(() => console.log('Welcome, your account has been created!'))
    .then(user => {
      this.afAuth.auth.currentUser.sendEmailVerification()
        .then(() => console.log('We sent you an email verification'))
        .catch(error => console.log(error.message));
        return user;
    });
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
        console.log('Async issue:' + error.message);
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
          .catch(error => alert(error.message));
          return user;
      });
  }

  resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email)
      .then(() => console.log('sent Password Reset Email!'))
      .catch((error) => console.log(error));
  }

  signOut() {
    this.afAuth.auth.signOut()
      .then(() => {
        this.router.navigate(['login']);
      }
    );
  }

  ///// Role-based Authorization //////

  clientRoles(user: User): boolean {
    const allowed = ['admin', 'specialist', 'client'];
    return this.checkAuthorization(user, allowed);
  }

  specialistRoles(user: User): boolean {
    const allowed = ['admin', 'specialist'];
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
