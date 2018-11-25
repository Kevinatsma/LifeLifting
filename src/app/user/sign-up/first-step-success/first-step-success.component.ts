import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-first-step-success',
  templateUrl: './first-step-success.component.html',
  styleUrls: ['./first-step-success.component.scss', './../../login/login.component.scss']
})
export class FirstStepSuccessComponent implements OnInit {

  constructor( public auth: AuthService) { }

  ngOnInit() {
  }

  dashboardLink() {
    alert('Fill out all the steps first!');
  }
}
