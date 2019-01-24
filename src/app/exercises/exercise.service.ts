import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, Subject } from 'rxjs';
import { Exercise } from './exercise.model';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  exerciseCol: AngularFirestoreCollection<Exercise>;
  exercises: Observable<Exercise[]>;
  exerciseDoc: AngularFirestoreDocument<Exercise>;
  exercise: Observable<Exercise>;

  editShow: boolean;
  editStateChange: Subject<boolean> = new Subject<boolean>();

  constructor( private afs: AngularFirestore,
               public snackBar: MatSnackBar
             ) {
    this.exerciseCol = this.afs.collection<Exercise>(`exercises`);
    this.exercises = this.getExercises();
    this.editStateChange.subscribe((value) => {
      this.editShow = value;
    });
  }


  toggleEdit() {
    this.editStateChange.next(!this.editShow);
  }

  getExerciseData(id) {
    this.exerciseDoc = this.afs.doc<Exercise>(`exercises/${id}`);
    this.exercise = this.exerciseDoc.valueChanges();
    return this.exercise;
  }

  getExercises() {
    this.exercises = this.exerciseCol.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Exercise;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
    return this.exercises;
  }

  addExercise(data) {
    this.afs.collection<Exercise>(`exercises`).doc(`${data.exerciseID}`).set(data, {merge: true})
    .then(() => {
      // Show Snackbar
      const message = `The ${data.exerciseName} was added succesfully`;
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

  updateExercise(id, data) {
    this.exerciseDoc = this.afs.doc<Exercise>(`exercises/${id}`);
    this.exerciseDoc.update(data);
  }

  deleteExercise(id) {
    this.exerciseDoc = this.afs.doc(`exercises/${id}`);
    this.exerciseDoc.delete();
  }
}
