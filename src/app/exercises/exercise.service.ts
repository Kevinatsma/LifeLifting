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
  exerciseDocOne: AngularFirestoreDocument<Exercise>;
  exerciseDocTwo: AngularFirestoreDocument<Exercise>;
  exerciseDocThree: AngularFirestoreDocument<Exercise>;
  exercise: Observable<Exercise>;
  guideExercises: {
    eOne: Observable<Exercise>;
    eTwo: Observable<Exercise>;
    eThree: Observable<Exercise>;
  };
  exerciseOne: Observable<Exercise>;
  exerciseTwo: Observable<Exercise>;
  exerciseThree: Observable<Exercise>;

  editShow: boolean;
  editStateChange: Subject<boolean> = new Subject<boolean>();

  constructor( public afs: AngularFirestore,
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

  getMultipleExercises(guideline) {
    this.exerciseDocOne = this.afs.doc<Exercise>(`exercises/${guideline.activities[0].activityID}`);
    this.exerciseOne = this.exerciseDocOne.valueChanges();
    if (guideline.activities[1]) {
      this.exerciseDocTwo = this.afs.doc<Exercise>(`exercises/${guideline.activities[1].activityID}`);
      this.exerciseTwo = this.exerciseDocTwo.valueChanges();
    }
    if (guideline.activities[2]) {
      this.exerciseDocThree = this.afs.doc<Exercise>(`exercises/${guideline.activities[2].activityID}`);
      this.exerciseThree = this.exerciseDocThree.valueChanges();
    }
    this.guideExercises = {
      eOne: this.exerciseOne,
      eTwo: this.exerciseTwo,
      eThree: this.exerciseThree
    };
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
