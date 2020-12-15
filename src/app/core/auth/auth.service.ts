import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';

import { User } from './../../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>;
  userData: User;
  authState: any = null;

  constructor( private afs: AngularFirestore,
               private afAuth: AngularFireAuth,
               private router: Router) {

    // Get Auth data, then get Firestore User Document || null
    this.user = this.afAuth.authState.pipe(
      switchMap((user: User) => {
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

  private oAuthSignUp(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user);
      })
      .then(() => {
        this.router.navigate(['dashboard']);
      })
      .catch(error => console.log(error.message));
  }

  private oAuthLogin(provider) {
    return this.afAuth.signInWithPopup(provider)
      .then((credential) => {
        if (credential.additionalUserInfo.isNewUser) {
          this.updateUserData(credential.user);
        }
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
      },
      testUser: false
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
    return this.afAuth;
  }

  getChatUser() {
    return this.user.pipe(first()).toPromise();
  }

  addUser(email: string, password: string, formData: any) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
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
        status: {
          accepted: false,
          appointment: false,
          appointmentAccepted: false,
          appointmentCompleted: false,
          signUpCompleted: false,
          subscriptionValid: false
        },
        signUpDate: new Date(),
        email: formData.email
      };
      this.addUserData(data, credential.user);
    })
    .then(() => console.log('Welcome, your account has been created!'))
    .then(_ => this.sendEmailVerification);
  }

  sendEmailVerification = () => {
    this.afAuth.currentUser
      .then(user => {
        user.sendEmailVerification()
          .then(() => console.log('We sent you an email verification'))
          .catch(error => console.error(error.message));
          return user;
      });
  }

  emailSignIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => console.log('You have successfully signed in'))
      .then(() => {
        return this.user;
      })
      .then(() => {
        this.router.navigate(['dashboard']);
      })
      .catch(error => {
        console.log('Async issue:' + error.message);
        alert('Wrong email or password ... 😔');
      });
  }

  emailSignUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((credential) => {
        this.updateUserData(credential.user);
      })
      .then(() => console.log('Welcome, your account has been created!'))
      .then(_ => this.sendEmailVerification);
  }

  resetPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email)
      .then(() => console.log('sent Password Reset Email!'))
      .catch((error) => console.log(error));
  }

  signOut() {
    this.afAuth.signOut()
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
