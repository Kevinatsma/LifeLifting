import { Component, OnInit, ViewEncapsulation, HostListener, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { User } from './../../user/user.model';
import { MeasurementService } from '../measurement.service';
import { AuthService } from './../../core/auth/auth.service';

@Component({
  selector: 'app-add-measurement',
  templateUrl: './add-measurement.component.html',
  styleUrls: ['./add-measurement.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddMeasurementComponent implements OnInit {
  weightForm: FormGroup;
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
               private dialogRef: MatDialogRef<AddMeasurementComponent>,
               private fb: FormBuilder,
               private auth: AuthService,
               private measurementService: MeasurementService,
               @Inject(MAT_DIALOG_DATA) public data: any
               ) {
                 this.client = this.data.client;
               }

  ngOnInit() {
    this.weightForm = this.fb.group({
      weight: ['', Validators.required],
    });

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
      thighMin: [''],
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
      specialistID: this.auth.currentUserId,
      created: new Date(),
      weight: this.weightForm.get('weight').value,
      perimeters: this.perimeterForm.value,
      skinfolds: this.skinfoldForm.value
    };
    this.measurementService.addMeasurement(data);
  }

  closeDialog() {
    if (confirm('Are you sure you want to stop adding these measurements?')) {
      this.dialog.closeAll();
    }
  }

}
