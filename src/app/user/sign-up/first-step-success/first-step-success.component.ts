import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { AuthService } from './../../../core/auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { User } from '../../user.model';
import { UtilService } from './../../../shared/services/util.service';

@Component({
  selector: 'app-first-step-success',
  templateUrl: './first-step-success.component.html',
  styleUrls: ['./first-step-success.component.scss', './../../login/login.component.scss']
})
export class FirstStepSuccessComponent implements OnInit {
  @Output() close = new EventEmitter();
  user: User;
  isMobile: boolean;

  constructor( public auth: AuthService,
               private userService: UserService,
               private utils: UtilService,
               private cdr: ChangeDetectorRef,
               public route: Router) {
                this.isMobile = this.utils.checkIfMobile();
               }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    const id = this.auth.currentUserId;
    this.userService.getUserDataByID(id).subscribe(user => {
      this.user = user;
    });
  }

  closeSection() {
    console.log('hey');
    this.close.emit(null);
  }
}
