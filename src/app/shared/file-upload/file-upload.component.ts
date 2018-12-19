import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileSizePipe } from './../pipes/file-size.pipe';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {

  @Output() imageEvent = new EventEmitter<string>();

  // Main Task
  task: AngularFireUploadTask;

  // Tracing
  percentage: Observable<number>;
  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;
  imageURL: string;

  // Dropzone Hover State
  isHovering: boolean;

  constructor( private storage: AngularFireStorage) { }

  ngOnInit() {
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  // startUpload(event: FileList) {
  //   // The File Object
  //   const file = event.item(0);

  //   // Client side Validation
  //   if (file.type.split('/')[0] !== 'image') {
  //     alert('That is not an image!');
  //   }

  //   // Storage Path
  //   const id = new Date().getTime() + file.name;
  //   const ref = this.storage.ref(`courses/` + id);

  //   // Totaly Optional meta data

  //   // Main Task
  //   this.task = ref.put(file, { customMetadata });

  //   // Observables for progress and actions
  //   this.percentage = this.task.percentageChanges();
  //   this.snapshot = this.task.snapshotChanges();
  // }

  startUpload(event: FileList) {
    const file = event.item(0);
    const id = file.name;
    const filePath = `/specialists/${id}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.percentage = task.percentageChanges();
    this.snapshot = task.snapshotChanges();
    // get notified when the download URL is available
    task.snapshotChanges()
    .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            this.imageURL = url;
            this.imageEvent.emit(this.imageURL);
          });
        })
     )
    .subscribe();
  }

  // .then(() => {
  //   this.sendDownloadURL();
  // });

  sendDownloadURL() {
    this.imageEvent.emit(this.imageURL);
  }


  // Determines if task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}
