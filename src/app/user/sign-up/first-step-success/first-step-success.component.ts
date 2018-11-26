import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-first-step-success',
  templateUrl: './first-step-success.component.html',
  styleUrls: ['./first-step-success.component.scss', './../../login/login.component.scss']
})
export class FirstStepSuccessComponent implements OnInit {
  @Output() close = new EventEmitter();

  constructor( public auth: AuthService) { }

  ngOnInit() {
  }

  closeSection() {
    this.close.emit(null);
  }
}
