import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { User } from '../../user/user.model';
import { Router } from '@angular/router';
import { FirstConsultation } from '../first-consultation.model';
import { AuthService } from '../../core/auth/auth.service';
import { MatDialog } from '@angular/material';
import { UserService } from '../../user/user.service';
import { FirstConsultationService } from '../first-consultation.service';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { EditFirstConsultationComponent } from '../edit-first-consultation/edit-first-consultation.component';
import { SpecialistService } from '../../specialists/specialist.service';
import { Specialist } from '../../specialists/specialist.model';
import { FirstConsultationDetailComponent } from '../first-consultation-detail/first-consultation-detail.component';


@Component({
  selector: 'app-first-consultation-list-item',
  templateUrl: './first-consultation-list-item.component.html',
  styleUrls: ['./first-consultation-list-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FirstConsultationListItemComponent implements OnInit {
  @Input() followUp: FirstConsultation;
  @Input() client: User;
  @Input() i;
  specialist: Specialist;
  detailOpen = false;

  constructor( public auth: AuthService,
               public router: Router,
               public dialog: MatDialog,
               private specialistService: SpecialistService,
               private followUpService: FirstConsultationService) {
                 setTimeout(() => this.getSpecialist(this.client.specialist));
                }

  ngOnInit() {
  }

  // Getters
  getSpecialist(id) {
    this.specialistService.getSpecialistData(id).subscribe(specialist => this.specialist = specialist);
  }

  // Data modifiers
  deleteFirstConsultation(followUp) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        fucID: followUp.fucID,
      },
      panelClass: 'confirm-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const id = followUp.fucID;
        this.followUpService.deleteFirstConsultation(id);
        console.log('deleted first-consultation consultation');
      } else if (result === false) {
        return null;
      }
    });
  }

  openFirstConsultationDetail(followUp) {
    const dialogRef = this.dialog.open(FirstConsultationDetailComponent, {
      data: {
        followUp: followUp,
        client: this.client
      },
      panelClass: 'first-consultation-detail-dialog'
    });
  }

  editFirstConsultation(followUp) {
    const dialogRef = this.dialog.open(EditFirstConsultationComponent, {
      data: {
        followUp: followUp,
        client: this.client
      },
      panelClass: 'first-consultation-dialog'
    });
  }

}
