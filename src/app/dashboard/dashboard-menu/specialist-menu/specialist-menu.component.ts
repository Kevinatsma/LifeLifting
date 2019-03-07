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
  linksCollapsed = false;
  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.linksCollapsed = !this.linksCollapsed;
  }

}
