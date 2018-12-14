import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { DataModule } from './data/data.module';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileUploadService } from './file-upload/file-upload.service';
import { FileSizePipe } from './pipes/file-size.pipe';
import { DropZoneDirective } from './directives/drop-zone.directive';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    DataModule,
  ],
  exports: [
    MaterialModule,
    DataModule,
    FileUploadComponent,
  ],
  declarations: [
    FileUploadComponent,
    FileSizePipe,
    DropZoneDirective
  ],
  providers: [
    FileUploadService
  ]
})
export class SharedModule { }
