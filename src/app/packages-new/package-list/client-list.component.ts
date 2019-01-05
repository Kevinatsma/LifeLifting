import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientService } from '../client.service';
import { User } from '../../user/user.model';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  clients: Observable<User[]>;

  constructor( private clientService: ClientService) { }

  ngOnInit() {
    this.clients = this.clientService.getClients();
  }

}
