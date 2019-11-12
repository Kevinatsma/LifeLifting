import { Component, OnInit, ViewEncapsulation, HostListener, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MeasurementService } from '../measurement.service';
import { User } from './../../user/user.model';
import { Measurement } from '../measurement.model';

@Component({
  selector: 'app-edit-measurement',
  templateUrl: './edit-measurement.component.html',
  styleUrls: ['./edit-measurement.component.scss', './../add-measurement/add-measurement.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditMeasurementComponent implements OnInit {
  weightForm: FormGroup;
  perimeterForm: FormGroup;
  skinfoldForm: FormGroup;

  measurement: Measurement;

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
               }

  ngOnInit() {
    this.measurement = this.data.measurement;

    this.weightForm = this.fb.group({
      weight: [this.measurement.weight || '']
    });

    this.perimeterForm = this.fb.group({
      head: [this.measurement.perimeters.head || ''],
      neck: [this.measurement.perimeters.neck || ''],
      armRelaxed: [this.measurement.perimeters.armRelaxed || ''],
      armFlexed: [this.measurement.perimeters.armFlexed || ''],
      forearm: [this.measurement.perimeters.forearm || ''],
      wrist: [this.measurement.perimeters.wrist || ''],
      thorax: [this.measurement.perimeters.thorax || ''],
      waist: [this.measurement.perimeters.waist || ''],
      hip: [this.measurement.perimeters.hip || ''],
      thighMin: [this.measurement.perimeters.thighMin || ''],
      thighMax: [this.measurement.perimeters.thighMax || ''],
      calf: [this.measurement.perimeters.calf || ''],
      ankle: [this.measurement.perimeters.ankle || '']
    });

    this.skinfoldForm = this.fb.group({
      triceps: [this.measurement.skinfolds.triceps || ''],
      biceps: [this.measurement.skinfolds.biceps || ''],
      subescapular: [this.measurement.skinfolds.subescapular || ''],
      crestaIliaca: [this.measurement.skinfolds.crestaIliaca || ''],
      supraespinal: [this.measurement.skinfolds.supraespinal || ''],
      abdominal: [this.measurement.skinfolds.abdominal || ''],
      frontalThigh: [this.measurement.skinfolds.frontalThigh || ''],
      skinfoldCalf:  [this.measurement.skinfolds.skinfoldCalf || '']
    });
  }

  addMeasurements() {
    const data = {
      clientID: this.measurement.clientID,
      created: this.measurement.created,
      edited: new Date(),
      weight: this.weightForm.get('weight').value,
      perimeters: this.perimeterForm.value,
      skinfolds: this.skinfoldForm.value
    };

    this.measurementService.updateMeasurement(this.measurement.measurementID, data);
  }

  closeDialog() {
    if (confirm('Are you sure you want to stop adding these measurements?')) {
      this.dialog.closeAll();
    }
  }

}
