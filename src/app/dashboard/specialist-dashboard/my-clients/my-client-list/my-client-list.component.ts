import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserService } from '../../../../user/user.service';
import { User } from '../../../../user/user.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Specialist } from './../../../../specialists/specialist.model';
import { AuthService } from './../../../../core/auth/auth.service';

@Component({
  selector: 'app-my-client-list',
  templateUrl: './my-client-list.component.html',
  styleUrls: ['./my-client-list.component.scss']
})
export class MyClientListComponent implements OnInit, OnDestroy {
  specialist: User;
  specialist$: Subscription;
  myClients: Observable<User[]>;
  myClientsCol: AngularFirestoreCollection<User>;

  constructor( private userService: UserService,
               private afs: AngularFirestore,
               private  auth: AuthService) { }

  ngOnInit() {
    this.specialist$ = this.userService.getUserDataByID(this.auth.currentUserId).subscribe((user) => {
      this.specialist = user;
      const specialistID = this.specialist.sID;
      this.myClientsCol = this.afs.collection('users', ref => ref.where('specialist', '==', `${specialistID}`));
      this.myClients = this.myClientsCol.valueChanges();
    });
  }

  ngOnDestroy() {
    if (this.specialist$ !== undefined) { this.specialist$.unsubscribe(); }
  }

}
