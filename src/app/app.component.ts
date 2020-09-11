import { Component } from '@angular/core';
import { fadeAnimation } from './core/animations/fade.animation';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})

export class AppComponent {
  title = 'Life Lifting';

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('en');
  }

  // public getRouterOutletState(outlet) {
  //   return outlet.isActivated ? outlet.activatedRoute : '';
  // }
}
