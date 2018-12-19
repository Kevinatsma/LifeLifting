import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  downloadURL: Observable<string>;

   // Tracing
   percentage: Observable<number>;
   snapshot: Observable<any>;

  constructor( private storage: AngularFireStorage) { }

  startUpload(event: FileList) {
    const file = event.item(0);
    const filePath = `courses`;
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
        })
     ).subscribe();
  }
}
