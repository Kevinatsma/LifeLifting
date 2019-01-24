import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../../../user/user.service';
import { User } from '../../../../user/user.model';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Specialist } from 'src/app/specialists/specialist.model';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-my-client-list',
  templateUrl: './my-client-list.component.html',
  styleUrls: ['./my-client-list.component.scss']
})
export class MyClientListComponent implements OnInit {
  specialist: User;
  myClients: Observable<User[]>;
  myClientsCol: AngularFirestoreCollection<User>;

  constructor( private userService: UserService,
               private afs: AngularFirestore,
               private  auth: AuthService) { }

  ngOnInit() {
    this.userService.getUserDataByID(this.auth.currentUserId).subscribe((user) => {
      this.specialist = user;
      const specialistID = 'specialist'  + this.specialist.sID;
      console.log(specialistID);
      this.myClientsCol = this.afs.collection('users', ref => ref.where('specialist', '==', `${specialistID}`));
      this.myClients = this.myClientsCol.valueChanges();
    });
    // this.myClients = this.userService.getMyClients();
  }

}
