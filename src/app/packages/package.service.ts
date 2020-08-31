import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { Package } from './package.model';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  packageCol: AngularFirestoreCollection<Package>;
  packages: Observable<Package[]>;
  packageDoc: AngularFirestoreDocument<Package>;
  package: Observable<Package>;

  editShow: boolean;
  editStateChange: Subject<boolean> = new Subject<boolean>();

  constructor( private afs: AngularFirestore,
               public snackBar: MatSnackBar
             ) {
    this.packageCol = this.afs.collection<Package>(`packages`);
    this.packages = this.getPackages();
    this.editStateChange.subscribe((value) => {
      this.editShow = value;
    });
  }


  toggleEdit() {
    this.editStateChange.next(!this.editShow);
  }

  getPackageData(id) {
    this.packageDoc = this.afs.doc<Package>(`packages/${id}`);
    this.package = this.packageDoc.valueChanges();
    return this.package;
  }

  getPackages() {
    this.packages = this.packageCol.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Package;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
    return this.packages;
  }

  addPackage(data) {
    this.afs.collection<Package>(`packages`).doc(`${data.packageID}`).set(data, {merge: true})
    .then(() => {
      // Show Snackbar
      const message = 'The Package was added succesfully';
      const action = 'Close';

      this.snackBar.open(message, action, {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
    })
    .catch(error => {
      alert(error.message);
      console.error(error.message);
    });
  }

  updatePackage(id, data) {
    this.packageDoc = this.afs.doc<Package>(`packages/${id}`);
    this.packageDoc.update(data);
  }

  deletePackage(id) {
    this.packageDoc = this.afs.doc(`packages/${id}`);
    this.packageDoc.delete();
  }
}
