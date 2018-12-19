import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
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

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { state: 'login' }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { state: 'signup' },
    children: [
      // {path: '', redirectTo: 'signup', pathMatch: 'full'},
      {path: 'step-one', component: SignupStepOneComponent},
      {path: 'step-two', component: SignupStepTwoComponent},
      {path: 'step-three', component: SignupStepThreeComponent},
      {path: 'step-four', component: SignupStepFourComponent},
    ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'packages',
    component: PackagesComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'specialists',
    component: SpecialistsComponent,
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // scrollPositionRestoration: 'top',
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 0] // x + y
    }),
    CoreModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
