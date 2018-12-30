import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { DataModule } from './data/data.module';
import { FileUploadService } from './file-upload/file-upload.service';
import { FileSizePipe } from './pipes/file-size.pipe';
import { DropZoneDirective } from './directives/drop-zone.directive';
import { DialogsModule } from './dialogs/dialogs.module';
import { FileUploadComponent } from './file-upload/file-upload.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    DataModule,
    DialogsModule
  ],
  declarations: [
    FileSizePipe,
    DropZoneDirective,
    FileUploadComponent
  ],
  exports: [
    MaterialModule,
    DataModule,
    DialogsModule,
    FileUploadComponent
  ],
  providers: [
    FileUploadService
  ]
})
export class SharedModule { }
