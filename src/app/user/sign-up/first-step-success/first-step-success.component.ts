import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from './../../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first-step-success',
  templateUrl: './first-step-success.component.html',
  styleUrls: ['./first-step-success.component.scss', './../../login/login.component.scss']
})
export class FirstStepSuccessComponent implements OnInit {
  @Output() close = new EventEmitter();

  constructor( public auth: AuthService,
               public route: Router) { }

  ngOnInit() {
  }

  closeSection() {
    this.close.emit(null);
  }
}
