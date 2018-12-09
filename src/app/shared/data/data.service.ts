import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Timezone } from './models/timezone.model';
import { MatSnackBar } from '@angular/material';

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
    this.timezonesCol = this.afs.collection('assets/timezones/GMT');
    this.timezones = this.timezonesCol.valueChanges();
    console.log(this.timezones);
    return this.timezones;
  }

}
