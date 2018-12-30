import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { fadeAnimation } from './core/animations/fade.animation';
// import { fadeAnimation } from './core/animations/fadeAnimation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})

export class AppComponent {
  title = 'LifeLifting';

  constructor( ) {
  }

  // public getRouterOutletState(outlet) {
  //   return outlet.isActivated ? outlet.activatedRoute : '';
  // }

}
