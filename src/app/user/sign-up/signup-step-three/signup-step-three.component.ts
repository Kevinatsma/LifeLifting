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

  basicUserDataForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public auth: AuthService,
    public router: Router
  ) {

  }

  ngOnInit() {
  }

}
