import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-misc-menu',
  templateUrl: './misc-menu.component.html',
  styleUrls: ['./../dashboard-menu.component.scss']
})
export class MiscMenuComponent implements OnInit {
  linksCollapsed = false;
  constructor() { }

  ngOnInit() {
  }

}
