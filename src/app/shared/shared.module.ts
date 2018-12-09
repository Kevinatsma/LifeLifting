import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { DataModule } from './data/data.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    DataModule
  ],
  exports: [
    MaterialModule,
    DataModule
  ],
  declarations: [

  ]
})
export class SharedModule { }
