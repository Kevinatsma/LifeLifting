import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { AuthService } from './../../../core/auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { User } from '../../user.model';
import { UtilService } from './../../../shared/services/util.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-first-step-success',
  templateUrl: './first-step-success.component.html',
  styleUrls: ['./first-step-success.component.scss', './../../login/login.component.scss']
})
export class FirstStepSuccessComponent implements OnInit, OnDestroy {
  @Output() close = new EventEmitter();
  user: User;
  user$: Subscription;
  isMobile: boolean;

  constructor( public auth: AuthService,
               private userService: UserService,
               private utils: UtilService,
               private cdr: ChangeDetectorRef,
               public route: Router) {
               }

  ngOnInit() {
    this.isMobile = this.utils.checkIfMobile();

    this.getUserData();
  }

  ngOnDestroy() {
    if (this.user$ !== undefined) { this.user$.unsubscribe(); }
  }

  getUserData() {
    const id = this.auth.currentUserId;
    this.user$ = this.userService.getUserDataByID(id).subscribe(user => {
      this.user = user;
    });
  }

  closeSection(step?: String) {
    this.close.emit(false);

    switch (step) {
      case 'step-one':
        this.route.navigate(['../../signup/step-one']);
        break;
      case 'step-two':
        this.route.navigate(['../../signup/step-two']);
        break;
      case 'step-three':
        this.route.navigate(['../../signup/step-three']);
        break;
      case 'step-four':
        this.route.navigate(['../../signup/step-four']);
        break;
      case 'step-five':
        this.route.navigate(['../../signup/limbo']);
        break;
      default:
        return;
    }
  }

  logout() {
    this.auth.signOut();
    this.route.navigate(['../../login']);
  }
}
