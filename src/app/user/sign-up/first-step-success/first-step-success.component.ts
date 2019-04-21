import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from './../../../core/auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { User } from '../../user.model';

@Component({
  selector: 'app-first-step-success',
  templateUrl: './first-step-success.component.html',
  styleUrls: ['./first-step-success.component.scss', './../../login/login.component.scss']
})
export class FirstStepSuccessComponent implements OnInit {
  @Output() close = new EventEmitter();
  user: User;

  constructor( public auth: AuthService,
               private userService: UserService,
               public route: Router) { }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    const id = this.auth.currentUserId;
    this.userService.getUserDataByID(id).subscribe(user => this.user = user);
  }


  closeSection() {
    this.close.emit(null);
  }
}
