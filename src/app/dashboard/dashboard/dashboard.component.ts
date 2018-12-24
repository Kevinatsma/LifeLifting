import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/user/user.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { fadeAnimation } from 'src/app/core/animations/fade.animation';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.scss'],
  animations: [fadeAnimation]
})
export class DashboardComponent implements OnInit {
  user: User;

  constructor( public auth: AuthService,
               public afs: AngularFirestore,
               public router: Router) { }

  ngOnInit() {

    this.afs.collection(`users`).doc(`${this.auth.authState.uid}`).ref.get()
        .then((doc) => {
          if (doc.exists) {
              // Write doc data to user variable
              const user = doc.data() as User;
              return this.user = user;
          } else {
              console.log('No such document!');
          }
        })
        .then(() => {
            this.redirect();
        })
        .catch(function(error) {
            console.log('Error getting document:', error);
        });

        console.log(this.user);
  }

  signOut() {
    this.auth.signOut();
  }

  redirect() {
    if (!this.user.basicData) {
      this.router.navigate(['signup/step-one']);
    } else if (!this.user.packageChoice) {
      this.router.navigate(['signup/step-two']);
    } else if (!this.user.appointment) {
      this.router.navigate(['signup/step-three']);
    } else if (!this.user.specialist) {
      this.router.navigate(['signup/step-four']);
    } else if (!this.user.signupCompleted) {
      return null;
    }
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
