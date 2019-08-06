import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MealplanService } from '../mealplan.service';
import { Mealplan } from '../mealplan.model';
import { UserService } from '../../user/user.service';
import { AuthService } from '../../core/auth/auth.service';
import { User } from '../../user/user.model';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-mealplan-list',
  templateUrl: './mealplan-list.component.html',
  styleUrls: ['./mealplan-list.component.scss']
})
export class MealplanListComponent implements OnInit, OnDestroy {
  mealplanCol: AngularFirestoreCollection<Mealplan[]>;
  mealplans: Observable<Mealplan[][]>;
  specialist: User;
  specialist$: Subscription;

  constructor( private userService: UserService,
               private afs: AngularFirestore,
               private auth: AuthService) { }

  ngOnInit() {
    this.specialist$ = this.userService.getUserDataByID(this.auth.currentUserId).subscribe((user) => {
      this.specialist = user;
      const specialistID = this.specialist.uid;
      this.mealplanCol = this.afs.collection('mealplans', ref => ref.where('specialistID', '==', `${specialistID}`));
      this.mealplans = this.mealplanCol.valueChanges();
    });
  }

  ngOnDestroy() {
    this.specialist$.unsubscribe();
  }

}
