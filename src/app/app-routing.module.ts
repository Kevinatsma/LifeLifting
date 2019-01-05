import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/sign-up/signup/signup.component';
import { SignupStepOneComponent } from './user/sign-up/signup-step-one/signup-step-one.component';
import { SignupStepThreeComponent } from './user/sign-up/signup-step-three/signup-step-three.component';
import { SignupStepTwoComponent } from './user/sign-up/signup-step-two/signup-step-two.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { PackagesComponent } from './packages/packages/packages.component';
import { SignupStepFourComponent } from './user/sign-up/signup-step-four/signup-step-four.component';
import { SpecialistsComponent } from './specialists/specialists/specialists.component';
import { DashboardHomeComponent } from './dashboard/dashboard-home/dashboard-home.component';
import { UsersComponent } from './user/users/users.component';
import { ClientsComponent } from './clients/clients.component';
import { FinancesComponent } from './finances/finances/finances.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'packages',
    component: PackagesComponent,
    // canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // scrollPositionRestoration: 'top',
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 0] // x + y
    }),
    CoreModule,
    DashboardModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
