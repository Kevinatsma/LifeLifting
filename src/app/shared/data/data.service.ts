import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Timezone } from './models/timezone.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Country } from './models/country.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  timezonesCol: AngularFirestoreCollection<Timezone>;
  timezones: Observable<Timezone[]>;

  constructor( private afs: AngularFirestore,
               public snackBar: MatSnackBar,
               public http: HttpClient
             ) {

  }

  public getTimezones() {
    this.timezonesCol = this.afs.collection(`assets/timezones/GMT`, ref => ref.orderBy('city', 'desc'));
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
