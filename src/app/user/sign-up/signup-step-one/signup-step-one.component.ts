import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-signup-step-one',
  templateUrl: './signup-step-one.component.html',
  styleUrls: ['./signup-steps.scss']
})
export class SignupStepOneComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
