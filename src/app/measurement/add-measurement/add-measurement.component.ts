import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-measurement',
  templateUrl: './add-measurement.component.html',
  styleUrls: ['./add-measurement.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddMeasurementComponent implements OnInit {
  perimeterForm: FormGroup;
  skinfoldForm: FormGroup;

  constructor( private dialog: MatDialog,
               private fb: FormBuilder,

               ) { }

  ngOnInit() {
    this.perimeterForm = this.fb.group({
      head: [''],
    });

    this.skinfoldForm = this.fb.group({
      triceps: [''],
    });
  }

  addMeasurements() {
    const data = {
      measurements: {
        head: this.perimeterForm.get('head').value,
        triceps: this.skinfoldForm.get('triceps').value
      }
    };

    console.log(data);
  }

  closeDialog() {
    if (confirm('Are you sure you want to stop adding these measurements?')) {
      this.dialog.closeAll();
    }
  }

}
