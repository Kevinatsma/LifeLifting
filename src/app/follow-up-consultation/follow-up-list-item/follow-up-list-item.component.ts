import { Component, Input, ViewEncapsulation, OnDestroy } from '@angular/core';
import { User } from '../../user/user.model';
import { Router } from '@angular/router';
import { FollowUpConsultation } from '../follow-up-consultation.model';
import { AuthService } from '../../core/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { FollowUpConsultationService } from './../follow-up-consultation.service';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { EditFollowUpComponent } from '../edit-follow-up/edit-follow-up.component';
import { SpecialistService } from './../../specialists/specialist.service';
import { Specialist } from './../../specialists/specialist.model';
import { FollowUpDetailComponent } from '../follow-up-detail/follow-up-detail.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-follow-up-list-item',
  templateUrl: './follow-up-list-item.component.html',
  styleUrls: ['./follow-up-list-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FollowUpListItemComponent implements OnDestroy {
  @Input() followUp: FollowUpConsultation;
  @Input() client: User;
  @Input() i;
  specialist: Specialist;
  specialist$: Subscription;
  detailOpen = false;

  constructor( public auth: AuthService,
               public router: Router,
               public dialog: MatDialog,
               private specialistService: SpecialistService,
               private followUpService: FollowUpConsultationService) {
                 setTimeout(() => this.getSpecialist(this.client.specialist));
                }

  ngOnDestroy() {
    if (this.specialist$ !== undefined) { this.specialist$.unsubscribe(); }
  }

  // Getters
  getSpecialist(id) {
    this.specialist$ = this.specialistService.getSpecialistData(id).subscribe(specialist => this.specialist = specialist);
  }

  // Data modifiers
  deleteFollowUp(followUp) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        fucID: followUp.fucID,
      },
      panelClass: 'confirm-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const id = followUp.fucID;
        this.followUpService.deleteFollowUpConsultation(id);
        console.log('deleted follow-up consultation');
      } else if (result === false) {
        return null;
      }
    });
  }

  openFollowUpDetail(followUp) {
    const dialogRef = this.dialog.open(FollowUpDetailComponent, {
      data: {
        followUp: followUp,
        client: this.client
      },
      panelClass: 'follow-up-detail-dialog'
    });
  }

  editFollowUp(followUp) {
    const dialogRef = this.dialog.open(EditFollowUpComponent, {
      data: {
        followUp: followUp,
        client: this.client
      },
      panelClass: 'follow-up-dialog'
    });
  }

}
