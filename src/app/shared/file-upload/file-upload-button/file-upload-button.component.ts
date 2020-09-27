import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-file-upload-button',
  templateUrl: './file-upload-button.component.html',
  styleUrls: ['./file-upload-button.component.scss']
})
export class FileUploadButtonComponent implements OnInit, OnDestroy {
  @Input() url: any;
  @Output() imageEvent = new EventEmitter<string>();

  // Main Task
  task: AngularFireUploadTask;
  task$: Subscription;

  // Tracing
  percentage: Observable<number>;
  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;
  downloadURL$: Subscription;
  imageURL: string;
  isLoading = false;

  // Dropzone Hover State
  isHovering: boolean;

  constructor( private storage: AngularFireStorage) { }

  ngOnInit() {
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    this.isLoading = true;
    const file = event.item(0);
    const id = file.name;
    const filePath = `${this.url}/${id}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.percentage = task.percentageChanges();
    this.snapshot = task.snapshotChanges();
    // get notified when the download URL is available
    this.task$ = task.snapshotChanges()
    .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL$ = this.downloadURL.subscribe(url => {
            this.imageURL = url;
            this.imageEvent.emit(this.imageURL);
            this.isLoading = false;
          });
        })
     )
    .subscribe();
  }

  ngOnDestroy() {
    if (this.task !== undefined) {
      this.task$.unsubscribe();
    }
    if (this.downloadURL$ !== undefined) {
      this.downloadURL$.unsubscribe();
    }
  }

  sendDownloadURL() {
    this.imageEvent.emit(this.imageURL);
  }

  // Determines if task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }
}
