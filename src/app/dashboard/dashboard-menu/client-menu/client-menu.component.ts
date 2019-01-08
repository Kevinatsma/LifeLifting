import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-menu',
  templateUrl: './client-menu.component.html',
  styleUrls: ['./../dashboard-menu.component.scss']
})
export class ClientMenuComponent implements OnInit {
  linksCollapsed = true;
  constructor() { }

  ngOnInit() {
  }

}
