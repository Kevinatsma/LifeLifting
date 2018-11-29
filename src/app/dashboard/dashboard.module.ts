import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/auth/guards/auth.guard';

const routes: Routes = [

];

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardModule { }
