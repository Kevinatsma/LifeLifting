import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileSizePipe } from '../../pipes/file-size.pipe';

@Component({
  selector: 'app-file-upload-exercise',
  templateUrl: './file-upload-exercise.component.html',
  styleUrls: ['./file-upload-exercise.component.scss', './../file-upload.component.scss'],
})
export class FileUploadExerciseComponent implements OnInit, OnDestroy {

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

  // Dropzone Hover State
  isHovering: boolean;

  constructor( private storage: AngularFireStorage) { }

  ngOnInit() {
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    const file = event.item(0);
    const id = file.name;
    const filePath = `/exercises/${id}`;
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
