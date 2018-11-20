import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LifeLifting';

  items: Observable<any[]>;
  constructor(afs: AngularFirestore) {
    this.items = afs.collection('items').valueChanges();
  }

}
