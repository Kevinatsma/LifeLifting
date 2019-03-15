import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Mealplan } from './../../../mealplans/mealplan.model';
import { MealplanService } from './../../../mealplans/mealplan.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-choose-mealplan-dialog',
  templateUrl: './choose-mealplan-dialog.component.html',
  styleUrls: ['./choose-mealplan-dialog.component.scss']
})
export class ChooseMealplanDialogComponent implements OnInit {
  chooseMealplanForm: FormGroup;
  selectedMealplan;
  mealplansCol: AngularFirestoreCollection<Mealplan>;
  mealplans: Observable<Mealplan[]>;

  constructor( private fb: FormBuilder,
               private auth: AuthService,
               private afs: AngularFirestore,
               public matDialog: MatDialog,
               @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.chooseMealplanForm = this.fb.group({
      mealplan: (''),
    });
    const uid =  this.auth.currentUserId;
    this.mealplansCol = this.afs.collection('mealplans', ref => ref.where('clientID', '==', `${uid}`));
    this.mealplans = this.mealplansCol.valueChanges();
    console.log(this.mealplans);
  }



}
