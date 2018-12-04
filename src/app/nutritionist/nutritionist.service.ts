import { Injectable } from '@angular/core';
import { Nutritionist } from './nutritionist.model';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NutritionistService {

  nutritionistCol: AngularFirestoreCollection<Nutritionist>;
  nutritionists: Observable<Nutritionist[]>;
  nutritionistDoc: AngularFirestoreDocument<Nutritionist>;
  nutritionist: Observable<Nutritionist>;

  constructor( private afs: AngularFirestore,
               public snackBar: MatSnackBar
             ) {
    this.nutritionistCol = this.afs.collection<Nutritionist>(`nutritionists`);
    this.nutritionists = this.getnutritionists();
  }

  getNutritionistData(id) {
    this.nutritionistDoc = this.afs.doc<Nutritionist>(`nutritionists/${id}`);
    this.nutritionist = this.nutritionistDoc.valueChanges();
    return this.nutritionist;
  }

  getnutritionists() {
    this.nutritionists = this.nutritionistCol.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Nutritionist;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
    return this.nutritionists;
  }

  addNutritionist(data) {
    this.afs.collection<Nutritionist>(`nutritionists`).add(data)
    .then(() => {
      // Show Snackbar
      const message = 'The Nutritionist was added succesfully';
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

  updateNutritionist(id, data) {
    this.nutritionistDoc = this.afs.doc<Nutritionist>(`nutritionists/${id}`);
    this.nutritionistDoc.update(data);
  }

  deleteNutritionist(id) {
    this.nutritionistDoc = this.afs.doc<Nutritionist>(`nutritionists/${id}`);
    this.nutritionistDoc.delete();
  }
}
