import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupStepOneComponent } from './signup-step-one/signup-step-one.component';
import { SignupStepTwoComponent } from './signup-step-two/signup-step-two.component';

@NgModule({
  declarations: [
    SignupStepOneComponent,
    SignupStepTwoComponent
],
  imports: [
    CommonModule
  ]
})
export class SignUpModule { }
