import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-step-three',
  templateUrl: './signup-step-three.component.html',
  styleUrls: ['./../signup-step-one/signup-steps.scss', './signup-step-three.component.scss']
})
export class SignupStepThreeComponent implements OnInit {
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
