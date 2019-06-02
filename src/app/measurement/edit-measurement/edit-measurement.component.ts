import { Component, OnInit, ViewEncapsulation, HostListener, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MeasurementService } from '../measurement.service';
import { User } from './../../user/user.model';

@Component({
  selector: 'app-edit-measurement',
  templateUrl: './edit-measurement.component.html',
  styleUrls: ['./edit-measurement.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditMeasurementComponent implements OnInit {
  perimeterForm: FormGroup;
  skinfoldForm: FormGroup;

  client:  User;

  // Disable popup from closing
  @HostListener('window:keyup.esc') onKeyUp() {
    const cn = confirm('Are you sure you want to quit adding these measurements? Your progress will be lost.');
    if (cn) {
      this.dialogRef.close();
    }
  }

  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
      event.returnValue = false;
  }

  constructor( private dialog: MatDialog,
               private dialogRef: MatDialogRef<EditMeasurementComponent>,
               private fb: FormBuilder,
               private measurementService: MeasurementService,
               @Inject(MAT_DIALOG_DATA) public data: any
               ) {
                 this.client = this.data.client;
               }

  ngOnInit() {
    this.perimeterForm = this.fb.group({
      head: [''],
      neck: [''],
      armRelaxed: [''],
      armFlexed: [''],
      forearm: [''],
      wrist: [''],
      thorax: [''],
      waist: [''],
      hip: [''],
      thighMid: [''],
      thighMax: [''],
      calf: [''],
      ankle: ['']
    });

    this.skinfoldForm = this.fb.group({
      triceps: [''],
      biceps: [''],
      subescapular: [''],
      crestaIliaca: [''],
      supraespinal: [''],
      abdominal: [''],
      frontalThigh: [''],
      skinfoldCalf:  ['']
    });
  }

  addMeasurements() {
    const data = {
      clientID: this.client.uid,
      created: new Date(),
      perimeters: this.perimeterForm.value,
      skinfolds: this.skinfoldForm.value
    };

    console.log(data);
    this.measurementService.addMeasurement(data);
  }

  closeDialog() {
    if (confirm('Are you sure you want to stop adding these measurements?')) {
      this.dialog.closeAll();
    }
  }

}
