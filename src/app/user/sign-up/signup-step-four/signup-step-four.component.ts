import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-step-four',
  templateUrl: './signup-step-four.component.html',
  styleUrls: ['./../signup-step-one/signup-steps.scss', './signup-step-four.component.scss']
})
export class SignupStepFourComponent implements OnInit {
  choiceMade = false;
  onlineAppointment = false;
  faceToFaceAppointment = false;

  constructor(
    public fb: FormBuilder,
    public auth: AuthService,
    public router: Router
  ) {

  }

  ngOnInit() {
  }

  onlineAppointmentOption() {
    this.onlineAppointment = true;
    this.choiceMade = true;
    this.faceToFaceAppointment = false;
  }

  faceToFaceAppointmentOption() {
    this.faceToFaceAppointment = true;
    this.choiceMade = true;
    this.onlineAppointment = false;
  }

}
