import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  isSignUpCalendar$: Subject<boolean> = new Subject();
  isSignUpCalendar: boolean;
  sideNavStateChange: Subject<boolean> = new Subject();
  sideNavOpened: boolean;

  constructor() {
    this.sideNavOpened = false;
    this.sideNavStateChange.subscribe((value) => {
      this.sideNavOpened = value;
    });
    this.isSignUpCalendar = false;
    this.isSignUpCalendar$.subscribe((value) => {
      this.isSignUpCalendar = value;
    });
   }

  toggleSideNav() {
    this.sideNavStateChange.next(!this.sideNavOpened);
  }
}
