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
import { DialogsModule } from './../../shared/dialogs/dialogs.module';

// Components
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './../login/login.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { PasswordResetComponent } from '../password-reset/password-reset.component';
import { FirstStepSuccessComponent } from './first-step-success/first-step-success.component';
import { SignupStepOneComponent } from './signup-step-one/signup-step-one.component';
import { SignupStepTwoComponent } from './signup-step-two/signup-step-two.component';
import { SignupStepThreeComponent } from './signup-step-three/signup-step-three.component';
import { SignupStepFourComponent } from './signup-step-four/signup-step-four.component';

// Services
import { AuthService } from './../../core/auth/auth.service';
import { SignUpBookingComponent } from './../../booking/signup-booking/signup-booking.component';
import { LimboStateComponent } from './limbo-state/limbo-state.component';

// Directives
import { CapsLockDirective } from './../../shared/directives/caps-lock.directive';

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
      {path: '', redirectTo: 'signup', pathMatch:  'full'},
      {path: 'step-one', component: SignupStepOneComponent, data: {state: 'step-one'}},
      {path: 'step-two', component: SignupStepTwoComponent, data: {state: 'step-two'}},
      {path: 'step-three', component: SignupStepThreeComponent, data: {state: 'step-three'}},
      {path: 'step-four', component: SignupStepFourComponent, data: {state: 'step-four'}},
      {path: 'step-five', component: SignUpBookingComponent, data: {state: 'step-five'}},
      {path: 'limbo', component: LimboStateComponent, data: {state: 'limbo'}},
    ]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: { state: 'forgot-password' }
  },
  {
    path: 'password-reset',
    component: PasswordResetComponent,
    data: { state: 'password-reset' }
  },
];

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    PasswordResetComponent,
    SignupStepOneComponent,
    SignupStepTwoComponent,
    FirstStepSuccessComponent,
    SignupStepThreeComponent,
    SignupStepFourComponent,
    LimboStateComponent,
    CapsLockDirective,
],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
}),
    CoreModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DialogsModule,
    PackagesModule,
    BookingModule,
    SpecialistModule
  ],
  exports: [
    LoginComponent,
    ForgotPasswordComponent,
    PasswordResetComponent,
    SignupComponent,
    LimboStateComponent,
    RouterModule
  ],
  providers: [
    AuthService
  ]
})
export class SignUpModule { }
