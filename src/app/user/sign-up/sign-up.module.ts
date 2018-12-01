import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from './../../core/core.module';
import { SharedModule } from './../../shared/shared.module';
import { PackagesModule } from './../../packages/packages.module';
import { SignupStepOneComponent } from './signup-step-one/signup-step-one.component';
import { SignupStepTwoComponent } from './signup-step-two/signup-step-two.component';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from 'src/app/core/auth/auth.service';
import { LoginComponent } from './../login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FirstStepSuccessComponent } from './first-step-success/first-step-success.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupStepThreeComponent } from './signup-step-three/signup-step-three.component';
import { SignupStepFourComponent } from './signup-step-four/signup-step-four.component';
import { BookingModule } from 'src/app/booking/booking.module';


const routes: Routes = [

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
    BookingModule
  ],
  exports: [
    LoginComponent,
    SignupComponent,
    SignupStepOneComponent,
    SignupStepTwoComponent,
    RouterModule
  ],
  providers: [
    AuthService
  ]
})
export class SignUpModule { }
