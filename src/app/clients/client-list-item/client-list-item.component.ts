import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './../../user/user.model';
import { ConfirmDialogComponent } from './../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { ClientService } from './../client.service';
import { ChatThreadService } from 'src/app/chat/chat-thread.service';

@Component({
  selector: 'app-client-list-item',
  templateUrl: './client-list-item.component.html',
  styleUrls: ['./client-list-item.component.scss']
})
export class ClientListItemComponent implements OnInit {
  @Input() client: User;
  detailOpen = false;

  constructor( public router: Router,
               public dialog: MatDialog,
               private clientService: ClientService,
               private threadService: ChatThreadService) { }

  ngOnInit() {
  }

  deleteClientDialog(client) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        clientID: client.uid,
        clientName: client.displayName
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result === true) {
        console.log('i"m being called');
        const id = client.uid;
        this.clientService.deleteUser(id);
      } else if (result === false) {
        return null;
      }
    });
  }

  editClient(client) {
    const url = `dashboard/clients/${client.uid}`;
    this.router.navigate([url]);
    return this.clientService.editShow = true;
  }


  linkToChild(client) {
    const url = `dashboard/clients/${client.uid}`;
    this.router.navigate([url]);
  }

  chat() {
    const profileId = this.client.uid;
    return this.threadService.createThread(profileId);
  }

}
