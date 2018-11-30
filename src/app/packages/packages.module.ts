import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PackageItemComponent } from './package-item/package-item.component';
import { AddPackageComponent } from './add-package/add-package.component';
import { PackageListComponent } from './package-list/package-list.component';
import { EditPackageComponent } from './edit-package/edit-package.component';

import { SharedModule } from '../shared/shared.module';
import { PackageService } from './package.service';
import { PackagesComponent } from './packages/packages.component';

@NgModule({
  declarations: [
    PackageItemComponent,
    AddPackageComponent,
    PackageListComponent,
    EditPackageComponent,
    PackagesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    PackageItemComponent,
    AddPackageComponent,
    PackageListComponent,
    EditPackageComponent,
    PackagesComponent
  ],
  providers: [
    PackageService
  ]
})
export class PackagesModule { }
