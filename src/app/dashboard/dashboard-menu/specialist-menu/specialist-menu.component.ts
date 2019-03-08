import { Component, OnInit } from '@angular/core';
import { openClose } from './../../../core/animations/open-close.animation';

@Component({
  selector: 'app-specialist-menu',
  animations: [
    openClose
  ],
  templateUrl: './specialist-menu.component.html',
  styleUrls: ['./../dashboard-menu.component.scss']
})
export class SpecialistMenuComponent implements OnInit {
  linksOpened = true;
  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.linksOpened = !this.linksOpened;
  }

}
