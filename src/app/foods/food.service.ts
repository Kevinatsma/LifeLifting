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
  foodCol: AngularFirestoreCollection<Food>;
  foods: Observable<Food[]>;
  foodDoc: AngularFirestoreDocument<Food>;
  food: Observable<Food>;

  editShow: boolean;
  editStateChange: Subject<boolean> = new Subject<boolean>();

  constructor( private afs: AngularFirestore,
               public snackBar: MatSnackBar
             ) {
    this.foodCol = this.afs.collection<Food>(`foods`);
    this.foods = this.getFoods();
    this.editStateChange.subscribe((value) => {
      this.editShow = value;
    });
  }


  toggleEdit() {
    this.editStateChange.next(!this.editShow);
  }

  getFoodData(id) {
    this.foodDoc = this.afs.doc<Food>(`foods/${id}`);
    this.food = this.foodDoc.valueChanges();
    return this.food;
  }

  getFoods() {
    this.foods = this.foodCol.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Food;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
    return this.foods;
  }

  addFood(data) {
    this.afs.collection<Food>(`foods`).doc(`${data.productID}`).set(data, {merge: true})
    .then(() => {
      // Show Snackbar
      const message = `The ${data.productName} was added succesfully`;
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

  updateFood(id, data) {
    this.foodDoc = this.afs.doc<Food>(`foods/${id}`);
    this.foodDoc.update(data);
  }

  deleteFood(id) {
    this.foodDoc = this.afs.doc(`foods/${id}`);
    this.foodDoc.delete();
  }
}
