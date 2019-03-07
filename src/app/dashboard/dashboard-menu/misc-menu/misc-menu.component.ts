import { Component, OnInit } from '@angular/core';
import { openClose } from './../../../core/animations/open-close.animation';

@Component({
  selector: 'app-misc-menu',
  animations: [
    openClose
  ],
  templateUrl: './misc-menu.component.html',
  styleUrls: ['./../dashboard-menu.component.scss']
})
export class MiscMenuComponent implements OnInit {
  linksCollapsed = false;
  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.linksCollapsed = !this.linksCollapsed;
  }

}
