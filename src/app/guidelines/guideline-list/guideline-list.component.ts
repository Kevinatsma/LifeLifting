import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GuidelineService } from '../guideline.service';
import { Guideline } from '../guideline.model';
import { UserService } from './../../user/user.service';
import { AuthService } from './../../core/auth/auth.service';
import { User } from './../../user/user.model';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-guideline-list',
  templateUrl: './guideline-list.component.html',
  styleUrls: ['./guideline-list.component.scss']
})
export class GuidelineListComponent implements OnInit {
  guidelineCol: AngularFirestoreCollection<Guideline[]>;
  guidelines: Observable<Guideline[][]>;
  specialist: User;

  constructor( private guidelineService: GuidelineService,
               private userService: UserService,
               private afs: AngularFirestore,
               private auth: AuthService) { }

  ngOnInit() {
    this.userService.getUserDataByID(this.auth.currentUserId).subscribe((user) => {
      this.specialist = user;
      const specialistID = this.specialist.uid;
      this.guidelineCol = this.afs.collection('guidelines', ref => ref.where('specialistID', '==', `${specialistID}`));
      this.guidelines = this.guidelineCol.valueChanges();
    });
  }

}