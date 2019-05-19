import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Mealplan } from './../../../mealplans/mealplan.model';
import { MealplanService } from './../../../mealplans/mealplan.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthService } from './../../../core/auth/auth.service';
import { Observable } from 'rxjs';
import { UserService } from './../../../user/user.service';
import { User } from './../../../user/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-mealplan-dialog',
  templateUrl: './choose-mealplan-dialog.component.html',
  styleUrls: ['./choose-mealplan-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChooseMealplanDialogComponent implements OnInit {
  user: User;
  chooseMealplanForm: FormGroup;
  selectedMealplan;
  mealplan: Mealplan;
  mealplansCol: AngularFirestoreCollection<Mealplan>;
  mealplans: Observable<Mealplan[]>;

  constructor( private fb: FormBuilder,
               private auth: AuthService,
               private afs: AngularFirestore,
               private userService: UserService,
               public router: Router,
               public matDialog: MatDialog,
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


  getUser() {
    const id = this.auth.currentUserId;
    this.userService.getUserDataByID(id).subscribe(user => {
      this.user = user;
      this.getMealplans(user.uid);
    });
  }

  getMealplans(uid) {
    this.mealplansCol = this.afs.collection('mealplans', ref => ref.where('clientID', '==', `${uid}`));
    this.mealplans = this.mealplansCol.valueChanges();
  }

  patchDropdown(data) {
    this.chooseMealplanForm.get('mealplan').patchValue(`${data.mealplanName}`);
  }

  linkToChild() {
    const id = this.chooseMealplanForm.get('mealplan').value || this.selectedMealplan;
    const url = `dashboard/shopping-list/${id}`;
    this.router.navigate([url]);
    this.matDialog.closeAll();
  }

}
