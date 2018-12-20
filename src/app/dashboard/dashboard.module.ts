import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/auth/guards/auth.guard';
import { DashboardMenuComponent } from './dashboard-menu/dashboard-menu.component';
import { DashboardTopNavComponent } from './dashboard-top-nav/dashboard-top-nav.component';
import { SpecialistsComponent } from '../specialists/specialists/specialists.component';
import { SpecialistModule } from '../specialists/specialist.module';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { UsersComponent } from '../user/users/users.component';
import { ClientsModule } from '../clients/clients.module';
import { ClientsComponent } from '../clients/clients/clients.component';
import { FinancesComponent } from '../finances/finances/finances.component';
import { FinancesModule } from '../finances/finances.module';
import { PackagesComponent } from '../packages/packages/packages.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: DashboardHomeComponent},
      {path: 'users', component: UsersComponent},
      {path: 'specialists', component: SpecialistsComponent},
      {path: 'clients', component: ClientsComponent},
      {path: 'finances', component: FinancesComponent},
      {path: 'packages', component: PackagesComponent},
    ]
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardHomeComponent,
    DashboardMenuComponent,
    DashboardTopNavComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    SpecialistModule,
    ClientsModule,
    FinancesModule
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardModule { }
