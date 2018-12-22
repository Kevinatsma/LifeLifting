import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Specialist } from '../specialist.model';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { SpecialistService } from '../specialist.service';

@Component({
  selector: 'app-specialist-list-item',
  templateUrl: './specialist-list-item.component.html',
  styleUrls: ['./specialist-list-item.component.scss']
})
export class SpecialistListItemComponent implements OnInit {
  @Input() specialist: Specialist;
  constructor( public router: Router,
               public dialog: MatDialog,
               private specialistService: SpecialistService) { }

  ngOnInit() {
  }

  deleteSpecialistDialog(specialist) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        specialistID: specialist.specialistID,
        firstName: specialist.firstName,
        lastName: specialist.lastName
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result === true) {
        this.specialistService.deleteSpecialist(specialist);
      }
    });
  }

  editSpecialist() {
    alert('TODO');
  }


  linkToChild(specialist) {
    const id = specialist.firstName.toLowerCase();
    const url = `dashboard/specialists/${id}`;
    this.router.navigate([url]);
  }

}
