import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  sideNavStateChange: Subject<boolean> = new Subject();
  sideNavOpened: boolean;

  constructor() {
    this.sideNavOpened = false;
    this.sideNavStateChange.subscribe((value) => {
      this.sideNavOpened = value;
    });
   }

   toggleSideNav() {
    // tslint:disable-next-line:max-line-length
    const isMobile: any = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/.test(window.navigator.userAgent);
    if (isMobile) {
      this.sideNavStateChange.next(!this.sideNavOpened);
    }
   }
}
