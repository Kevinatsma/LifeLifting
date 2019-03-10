import { Component, ViewEncapsulation } from '@angular/core';
import { fadeAnimation } from './core/animations/fade.animation';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})

export class AppComponent {
  title = 'LifeLifting';
  encapsulation: ViewEncapsulation.None;

  constructor( ) {
  }

  // public getRouterOutletState(outlet) {
  //   return outlet.isActivated ? outlet.activatedRoute : '';
  // }

}
