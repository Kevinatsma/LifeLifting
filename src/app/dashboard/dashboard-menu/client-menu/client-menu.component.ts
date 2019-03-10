import { Component, OnInit } from '@angular/core';
import { openClose } from './../../../core/animations/open-close.animation';

@Component({
  selector: 'app-client-menu',
  animations: [
    openClose
  ],
  templateUrl: './client-menu.component.html',
  styleUrls: ['./../dashboard-menu.component.scss']
})
export class ClientMenuComponent implements OnInit {
  linksOpened = false;

  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.linksOpened = !this.linksOpened;
  }

}
