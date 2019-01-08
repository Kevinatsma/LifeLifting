import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, Subject } from 'rxjs';
import { Food } from './food.model';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  packageCol: AngularFirestoreCollection<Food>;
  packages: Observable<Food[]>;
  packageDoc: AngularFirestoreDocument<Food>;
  food: Observable<Food>;

  editShow: boolean;
  editStateChange: Subject<boolean> = new Subject<boolean>();

  constructor( private afs: AngularFirestore,
               public snackBar: MatSnackBar
             ) {
    this.packageCol = this.afs.collection<Food>(`packages`);
    this.packages = this.getPackages();
    this.editStateChange.subscribe((value) => {
      this.editShow = value;
    });
  }


  toggleEdit() {
    this.editStateChange.next(!this.editShow);
  }

  getPackageData(id) {
    this.packageDoc = this.afs.doc<Food>(`packages/${id}`);
    this.food = this.packageDoc.valueChanges();
    return this.food;
  }

  getPackages() {
    this.packages = this.packageCol.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Food;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
    return this.packages;
  }

  addPackage(data) {
    this.afs.collection<Food>(`packages`).doc(`${data.packageID}`).set(data, {merge: true})
    .then(() => {
      // Show Snackbar
      const message = 'The Package was added succesfully';
      const action = 'Close';

      this.snackBar.open(message, action, {
        duration: 4000,
        panelClass: ['success-snackbar']
      });
    })
    .catch(error => {
      alert(error.message);
      console.error(error.message);
    });
  }

  updatePackage(id, data) {
    this.packageDoc = this.afs.doc<Food>(`packages/${id}`);
    this.packageDoc.update(data);
  }

  deletePackage(id) {
    this.packageDoc = this.afs.doc(`packages/${id}`);
    this.packageDoc.delete();
  }
}
