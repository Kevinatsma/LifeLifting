import { Component, OnInit } from '@angular/core';
import { openClose } from './../../../core/animations/open-close.animation';

@Component({
  selector: 'app-admin-menu',
  animations: [
    openClose
  ],
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./../dashboard-menu.component.scss']
})
export class AdminMenuComponent implements OnInit {
  linksOpened = true;

  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.linksOpened = !this.linksOpened;
  }

}
