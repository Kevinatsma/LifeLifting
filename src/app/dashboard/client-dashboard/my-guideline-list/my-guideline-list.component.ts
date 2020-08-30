import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { GuidelineService } from './../../../guidelines/guideline.service';
import { Guideline } from './../../../guidelines/guideline.model';
import { UserService } from './../../../user/user.service';
import { AuthService } from './../../../core/auth/auth.service';
import { User } from './../../../user/user.model';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-my-guideline-list',
  templateUrl: './my-guideline-list.component.html',
  styleUrls: ['./my-guideline-list.component.scss', './../../../guidelines/guideline-list/guideline-list.component.scss']
})
export class MyGuidelineListComponent implements OnInit, OnDestroy {
  guidelineCol: AngularFirestoreCollection<Guideline[]>;
  guidelines: Observable<Guideline[][]>;
  specialist: User;
  userSubscription$: Subscription;

  constructor( private guidelineService: GuidelineService,
               private userService: UserService,
               private afs: AngularFirestore,
               private auth: AuthService) { }

  ngOnInit() {
    this.userSubscription$ = this.userService.getUserDataByID(this.auth.currentUserId).subscribe((user) => {
      const clientID = user.uid;
      this.guidelineCol = this.afs.collection('guidelines', ref => ref.where('clientID', '==', `${clientID}`));
      this.guidelines = this.guidelineCol.valueChanges();
    });
  }

  ngOnDestroy() {
    this.userSubscription$.unsubscribe();
  }

}
