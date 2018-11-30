import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-signup-step-four',
  templateUrl: './signup-step-four.component.html',
  styleUrls: ['./signup-step-four.component.scss', './../signup-step-one/signup-steps.scss']
})
export class SignupStepFourComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
