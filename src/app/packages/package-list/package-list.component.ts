import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PackageService } from '../package.service';
import { Package } from '../package.model';

@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.scss']
})
export class PackageListComponent implements OnInit {
  packages: Observable<Package[]>;

  constructor( private packageService: PackageService) { }

  ngOnInit() {
    this.packages = this.packageService.getPackages();
  }

}
