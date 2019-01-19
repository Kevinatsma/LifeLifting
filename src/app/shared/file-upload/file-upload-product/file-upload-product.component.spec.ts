import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadProductComponent } from './file-upload-product.component';

describe('FileUploadProductComponent', () => {
  let component: FileUploadProductComponent;
  let fixture: ComponentFixture<FileUploadProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileUploadProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
