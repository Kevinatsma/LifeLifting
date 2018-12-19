import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './clients/clients.component';
import { ClientListComponent } from './client-list/client-list.component';

@NgModule({
  declarations: [ClientsComponent, ClientListComponent],
  imports: [
    CommonModule
  ]
})
export class ClientModule { }
