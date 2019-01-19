import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadExerciseComponent } from './file-upload-exercise.component';

describe('FileUploadExerciseComponent', () => {
  let component: FileUploadExerciseComponent;
  let fixture: ComponentFixture<FileUploadExerciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileUploadExerciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
