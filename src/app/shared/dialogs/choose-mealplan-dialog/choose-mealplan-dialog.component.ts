import { Component, OnInit, Inject, ViewEncapsulation, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Mealplan } from './../../../mealplans/mealplan.model';
import { MealplanService } from './../../../mealplans/mealplan.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from './../../../core/auth/auth.service';
import { Observable, Subscription } from 'rxjs';
import { UserService } from './../../../user/user.service';
import { User } from './../../../user/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-mealplan-dialog',
  templateUrl: './choose-mealplan-dialog.component.html',
  styleUrls: ['./choose-mealplan-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChooseMealplanDialogComponent implements OnInit, OnDestroy {
  user: User;
  user$: Subscription;
  chooseMealplanForm: FormGroup;
  selectedMealplan;
  mealplan: Mealplan;
  mealplansCol: AngularFirestoreCollection<Mealplan>;
  mealplans: Mealplan[];
  mealplansAvailable = false;

  constructor( private fb: FormBuilder,
               private auth: AuthService,
               private afs: AngularFirestore,
               private userService: UserService,
               public router: Router,
               public dialog: MatDialog,
               @Inject(MAT_DIALOG_DATA) public data: any) {
                if (this.data.mealplan) {
                  this.patchDropdown(this.data.mealplan);
                }
               }

  ngOnInit() {
    this.chooseMealplanForm = this.fb.group({
      mealplan: (''),
    });
    this.getUser();
  }

  ngOnDestroy() {
    this.user$.unsubscribe();
  }


  getUser() {
    const id = this.auth.currentUserId;
    this.user$ = this.userService.getUserDataByID(id).subscribe(user => {
      this.user = user;
      this.getMealplans(user.uid);
    });
  }

  getMealplans(uid) {
    this.mealplansCol = this.afs.collection('mealplans', ref => ref.where('clientID', '==', `${uid}`));
    const mealplanList = this.mealplansCol.valueChanges();
    mealplanList.subscribe(mealplans =>  {
      this.mealplans = mealplans;
      this.mealplansAvailable = mealplans.length > 0;
    });
  }

  patchDropdown(data) {
    this.chooseMealplanForm.get('mealplan').patchValue(`${data.mealplanName}`);
  }

  linkToChild() {
    const id = this.chooseMealplanForm.get('mealplan').value || this.selectedMealplan;
    const url = `dashboard/shopping-list/${id}`;
    this.router.navigate([url]);
    this.dialog.closeAll();
  }

}
