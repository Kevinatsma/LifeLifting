import { Component, OnInit, Input, ViewEncapsulation, OnDestroy } from '@angular/core';
import { User } from './../../user/user.model';
import { Router } from '@angular/router';
import { Measurement } from './../measurement.model';
import { AuthService } from './../../core/auth/auth.service';
import { MatDialog } from '@angular/material';
import { UserService } from './../../user/user.service';
import { MeasurementService } from './../measurement.service';
import { ConfirmDialogComponent } from './../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { EditMeasurementComponent } from '../edit-measurement/edit-measurement.component';
import { MeasurementDetailComponent } from '../measurement-detail/measurement-detail.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-measurement-list-item',
  templateUrl: './measurement-list-item.component.html',
  styleUrls: ['./measurement-list-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MeasurementListItemComponent implements OnInit, OnDestroy {
  @Input() measurement: Measurement;
  @Input() client: User;
  @Input() i;
  specialist: User;
  specialist$: Subscription;
  detailOpen = false;

  constructor( public auth: AuthService,
               public router: Router,
               public dialog: MatDialog,
               private userService: UserService,
               private measurementService: MeasurementService) { }

  ngOnInit() {
    this.specialist$ =  this.userService.getUserDataByID(this.measurement.specialistID).subscribe(user => this.specialist = user);
  }

  ngOnDestroy() {
    this.specialist$.unsubscribe();
  }

  deleteMeasurement(measurement) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        measurementID: measurement.measurementID,
        measurementName: measurement.measurementName,
      },
      panelClass: 'confirm-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const id = measurement.measurementID;
        this.measurementService.deleteMeasurement(id);
        console.log('deleted measurement');
      } else if (result === false) {
        return null;
      }
    });
  }

  editMeasurement(measurement) {
    const dialogRef = this.dialog.open(EditMeasurementComponent, {
      data: {
        measurement: measurement
      },
      panelClass: 'add-measurement-dialog'
    });
  }

  openMeasurementDetail(measurement) {
    const dialogRef = this.dialog.open(MeasurementDetailComponent, {
      data: {
        measurement: measurement
      },
      panelClass: 'measurement-detail-dialog'
    });
  }

}
