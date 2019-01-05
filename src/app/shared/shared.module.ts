import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { DataModule } from './data/data.module';
import { FileUploadService } from './file-upload/file-upload.service';
import { FileSizePipe } from './pipes/file-size.pipe';
import { DropZoneDirective } from './directives/drop-zone.directive';
import { DialogsModule } from './dialogs/dialogs.module';
import { FileUploadButtonComponent } from './file-upload/file-upload-button/file-upload-button.component';

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
    FileUploadButtonComponent,
  ],
  exports: [
    MaterialModule,
    DataModule,
    DialogsModule,
    FileUploadButtonComponent
  ],
  providers: [
    FileUploadService
  ]
})
export class SharedModule { }
