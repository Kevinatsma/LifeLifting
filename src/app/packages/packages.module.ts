import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PackageItemComponent } from '../packages/package-item/package-item.component';
import { PackageListItemComponent } from './package-list-item/package-list-item.component';
import { PackageListComponent } from '../packages/package-list/package-list.component';
import { EditPackageComponent } from '../packages/edit-package/edit-package.component';

import { SharedModule } from '../shared/shared.module';
import { PackageService } from './package.service';
import { PackagesComponent } from './packages.component';
import { PackageDetailComponent } from './package-detail/package-detail.component';
import { AddPackageDialogComponent } from '../shared/dialogs/add-package-dialog/add-package-dialog.component';

@NgModule({
  declarations: [
    PackageItemComponent,
    PackageListItemComponent,
    AddPackageDialogComponent,
    PackageListComponent,
    EditPackageComponent,
    PackagesComponent,
    PackageDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    PackageItemComponent,
    PackageListItemComponent,
    AddPackageDialogComponent,
    PackageListComponent,
    EditPackageComponent,
    PackagesComponent,
    PackageDetailComponent
  ],
  providers: [
    PackageService
  ]
})
export class PackagesModule { }
