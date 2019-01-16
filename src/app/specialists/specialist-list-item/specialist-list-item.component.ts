import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Specialist } from '../specialist.model';
import { ConfirmDialogComponent } from './../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { SpecialistService } from '../specialist.service';
import { ChatThreadService } from './../../chat/chat-thread.service';

@Component({
  selector: 'app-specialist-list-item',
  templateUrl: './specialist-list-item.component.html',
  styleUrls: ['./specialist-list-item.component.scss']
})
export class SpecialistListItemComponent implements OnInit {
  @Input() specialist: Specialist;
  detailOpen = false;

  constructor( public router: Router,
               public dialog: MatDialog,
               private specialistService: SpecialistService,
               private threadService: ChatThreadService) { }

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
        console.log('i"m being called');
        const id = specialist.specialistID;
        this.specialistService.deleteSpecialist(id);
      } else if (result === false) {
        return null;
      }
    });
  }

  editSpecialist(specialist) {
    const id = specialist.specialistID.toLowerCase();
    const url = `dashboard/specialists/${id}`;
    this.router.navigate([url]);
    return this.specialistService.editShow = true;
  }


  linkToChild(specialist) {
    const id = specialist.specialistID.toLowerCase();
    const url = `dashboard/specialists/${id}`;
    this.router.navigate([url]);
  }

  chat() {
    const profileId = this.specialist.uid;
    return this.threadService.createThread(profileId);
  }

}
