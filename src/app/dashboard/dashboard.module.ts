import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardMenuComponent } from './dashboard-menu/dashboard-menu.component';
import { DashboardTopNavComponent } from './dashboard-top-nav/dashboard-top-nav.component';
import { SpecialistsComponent } from '../specialists/specialists/specialists.component';
import { SpecialistModule } from '../specialists/specialist.module';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { UsersComponent } from '../user/users/users.component';
import { ClientsModule } from './../clients/clients.module';
import { ClientsComponent } from '../clients/clients.component';
import { FinancesComponent } from '../finances/finances/finances.component';
import { FinancesModule } from '../finances/finances.module';
import { PackagesComponent } from '../packages/packages.component';
import { PackageDetailComponent } from '../packages/package-detail/package-detail.component';
import { AdminMenuComponent } from './dashboard-menu/admin-menu/admin-menu.component';
import { SpecialistMenuComponent } from './dashboard-menu/specialist-menu/specialist-menu.component';
import { ClientMenuComponent } from './dashboard-menu/client-menu/client-menu.component';
import { MiscMenuComponent } from './dashboard-menu/misc-menu/misc-menu.component';
import { SpecialistDetailComponent } from '../specialists/specialist-detail/specialist-detail.component';
import { MaterialModule } from '../shared/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserDetailComponent } from '../user/users/user-detail/user-detail.component';
import { ClientDetailComponent } from '../clients/client-detail/client-detail.component';
import { FoodsModule } from './../foods/foods.module';
import { FoodsComponent } from './../foods/foods.component';
import { FoodDetailComponent } from './../foods/food-detail/food-detail.component';
import { AuthGuard } from '../core/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: DashboardHomeComponent, data: {state: 'home'}},
      {path: 'users', component: UsersComponent, data: {state: 'users'}, canActivate: [AuthGuard]},
      {path: 'users/:id', component: UserDetailComponent, canActivate: [AuthGuard]},
      {path: 'specialists', component: SpecialistsComponent, data: {state: 'specialist'}, canActivate: [AuthGuard]},
      {path: 'specialists/:id', component: SpecialistDetailComponent, canActivate: [AuthGuard]},
      {path: 'clients', component: ClientsComponent, data: {state: 'clients'}, canActivate: [AuthGuard]},
      {path: 'clients/:id', component: ClientDetailComponent, canActivate: [AuthGuard]},
      {path: 'finances', component: FinancesComponent, data: {state: 'finances'}, canActivate: [AuthGuard]},
      {path: 'packages', component: PackagesComponent, data: {state: 'packages'}, canActivate: [AuthGuard]},
      {path: 'packages/:id', component: PackageDetailComponent, canActivate: [AuthGuard]},
      {path: 'foods', component: FoodsComponent, data: {state: 'foods'}, canActivate: [AuthGuard]},
      {path: 'foods/:id', component: FoodDetailComponent, canActivate: [AuthGuard]},
    ]
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardHomeComponent,
    DashboardMenuComponent,
    DashboardTopNavComponent,
    AdminMenuComponent,
    SpecialistMenuComponent,
    ClientMenuComponent,
    MiscMenuComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    RouterModule.forRoot(routes),
    SpecialistModule,
    ClientsModule,
    FoodsModule,
    FinancesModule,
    MaterialModule
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardModule { }
