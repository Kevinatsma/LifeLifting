import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { DataModule } from './data/data.module';
import { FileUploadService } from './file-upload/file-upload.service';
import { FileSizePipe } from './pipes/file-size.pipe';
import { DropZoneDirective } from './directives/drop-zone.directive';
import { DialogsModule } from './dialogs/dialogs.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    DataModule,
    DialogsModule
  ],
  exports: [
    MaterialModule,
    DataModule,
    DialogsModule,
  ],
  declarations: [
    FileSizePipe,
    DropZoneDirective,
  ],
  providers: [
    FileUploadService
  ]
})
export class SharedModule { }
