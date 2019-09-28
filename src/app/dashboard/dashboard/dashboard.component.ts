import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from './../../core/auth/auth.service';
import { User } from './../../user/user.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';
import { routeTransition } from './../../core/animations/route-transition';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.scss'],
  animations: [routeTransition],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  user: User;

  constructor( public auth: AuthService,
               private afs: AngularFirestore,
               public router: Router,
               public location: Location,
               private dashboardService: DashboardService) { }

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
      .catch(error => {
          console.log('Error getting document:', error);
          this.router.navigate(['../login']);
      });
  }

  signOut() {
    this.auth.signOut();
  }

  redirect() {
    if (!this.user.basicData) {
      this.router.navigate(['signup/step-one']);
    } else if (!this.user.packageChoice) {
      this.router.navigate(['signup/step-two']);
    } else if (!this.user.specialist) {
      this.router.navigate(['signup/step-three']);
    } else if (!this.user.status.appointment) {
      this.router.navigate(['signup/step-four']);
    } else if (!this.user.status.accepted  && this.auth.currentUserId) {
      this.router.navigate(['signup/limbo']);
    } else if (!this.user.status.appointmentAccepted) {
      this.router.navigate(['signup/limbo']);
    } else if (!this.user.status.appointmentCompleted) {
      this.router.navigate(['signup/limbo']);
    } else if (!this.user.status.subscriptionValid) {
      this.router.navigate(['signup/limbo']);
    }
  }

  // Getters
  get sideNavOpened(): boolean {
    return this.dashboardService.sideNavOpened;
  }

  close() {
    this.dashboardService.toggleSideNav();
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }

  goBack() {
    this.location.back();
  }
}
