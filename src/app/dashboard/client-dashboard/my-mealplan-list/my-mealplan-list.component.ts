import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MealplanService } from './../../../mealplans/mealplan.service';
import { Mealplan } from './../../../mealplans/mealplan.model';
import { UserService } from './../../../user/user.service';
import { AuthService } from './../../../core/auth/auth.service';
import { User } from './../../../user/user.model';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-my-mealplan-list',
  templateUrl: './my-mealplan-list.component.html',
  styleUrls: ['./my-mealplan-list.component.scss']
})
export class MyMealplanListComponent implements OnInit {
  mealplanCol: AngularFirestoreCollection<Mealplan[]>;
  mealplans: Observable<Mealplan[][]>;
  specialist: User;

  constructor( private mealplanService: MealplanService,
               private userService: UserService,
               private afs: AngularFirestore,
               private auth: AuthService) { }

  ngOnInit() {
    this.userService.getUserDataByID(this.auth.currentUserId).subscribe((user) => {
      this.specialist = user;
      const specialistID = this.specialist.uid;
      this.mealplanCol = this.afs.collection('mealplans', ref => ref.where('clientID', '==', `${specialistID}`));
      this.mealplans = this.mealplanCol.valueChanges();
    });
  }

}
