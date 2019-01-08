import { Component, OnInit, Input } from '@angular/core';
import { Package } from '../../packages/package.model';

@Component({
  selector: 'app-package-item',
  templateUrl: './package-item.component.html',
  styleUrls: ['./package-item.component.scss']
})
export class PackageItemComponent implements OnInit {
  @Input() package: Package;

  constructor() { }

  ngOnInit() {
  }

}
