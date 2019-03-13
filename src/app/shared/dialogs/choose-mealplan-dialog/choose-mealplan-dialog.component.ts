import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-choose-mealplan-dialog',
  templateUrl: './choose-mealplan-dialog.component.html',
  styleUrls: ['./choose-mealplan-dialog.component.scss']
})
export class ChooseMealplanDialogComponent implements OnInit {
  chooseMealplanForm: FormGroup;
  selectedMealplan;

  constructor( private fb: FormBuilder,
               public matDialog: MatDialog,
               @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.chooseMealplanForm = this.fb.group({
      mealplan: (''),
    });
  }

}
