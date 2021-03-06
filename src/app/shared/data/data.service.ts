import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Timezone } from './models/timezone.model';
import { MatSnackBar } from '@angular/material';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  timezonesCol: AngularFirestoreCollection<Timezone>;
  timezones: Observable<Timezone[]>;

  constructor( private afs: AngularFirestore,
               public snackBar: MatSnackBar
             ) {
  }

  public getTimezones() {
    this.timezonesCol = this.afs.collection(`assets/timezones/GMT`, ref => ref.orderBy('city', 'asc'));
    this.timezones = this.timezonesCol.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Timezone;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
    return this.timezones;
  }

}
