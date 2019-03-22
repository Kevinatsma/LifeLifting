import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// App Modules
import { CoreModule } from './../../core/core.module';
import { SharedModule } from './../../shared/shared.module';
import { PackagesModule } from './../../packages/packages.module';
import { BookingModule } from './../../booking/booking.module';
import { SpecialistModule } from './../../specialists/specialist.module';

// Components
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './../login/login.component';
import { FirstStepSuccessComponent } from './first-step-success/first-step-success.component';
import { SignupStepOneComponent } from './signup-step-one/signup-step-one.component';
import { SignupStepTwoComponent } from './signup-step-two/signup-step-two.component';
import { SignupStepThreeComponent } from './signup-step-three/signup-step-three.component';
import { SignupStepFourComponent } from './signup-step-four/signup-step-four.component';

// Services
import { AuthService } from './../../core/auth/auth.service';



const routes: Routes = [
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
      {path: '', redirectTo: 'signup', pathMatch: 'full'},
      {path: 'step-one', component: SignupStepOneComponent, data: {state:  'step-one'}},
      {path: 'step-two', component: SignupStepTwoComponent, data: {state:  'step-two'}},
      {path: 'step-three', component: SignupStepFourComponent, data: {state:  'step-three'}},
      {path: 'step-four', component: SignupStepThreeComponent, data: {state:  'step-four'}},
    ]
  },
];

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    SignupStepOneComponent,
    SignupStepTwoComponent,
    FirstStepSuccessComponent,
    SignupStepThreeComponent,
    SignupStepFourComponent,
],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    CoreModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PackagesModule,
    BookingModule,
    SpecialistModule
  ],
  exports: [
    LoginComponent,
    SignupComponent,
    RouterModule
  ],
  providers: [
    AuthService
  ]
})
export class SignUpModule { }
