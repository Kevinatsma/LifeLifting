import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Mealplan } from './../../../mealplans/mealplan.model';
import { UserService } from './../../../user/user.service';
import { AuthService } from './../../../core/auth/auth.service';
import { User } from './../../../user/user.model';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-my-mealplan-list',
  templateUrl: './my-mealplan-list.component.html',
  styleUrls: ['./my-mealplan-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyMealplanListComponent implements OnInit, OnDestroy {
  mealplanCol: AngularFirestoreCollection<Mealplan[]>;
  mealplans: Observable<Mealplan[][]>;
  specialist: User;
  userSubscription$: Subscription;

  constructor( private userService: UserService,
               private afs: AngularFirestore,
               private auth: AuthService) { }

  ngOnInit() {
    this.userSubscription$ = this.userService.getUserDataByID(this.auth.currentUserId).subscribe((user) => {
      const clientID = user.uid;
      this.mealplanCol = this.afs.collection('mealplans', ref => ref.where('clientID', '==', `${clientID}`));
      this.mealplans = this.mealplanCol.valueChanges();
    });
  }

  ngOnDestroy() {
    this.userSubscription$.unsubscribe();
  }

}
