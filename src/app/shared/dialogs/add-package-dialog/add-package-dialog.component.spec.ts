import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPackageDialogComponent } from './add-package-dialog.component';

describe('AddPackageDialogComponent', () => {
  let component: AddPackageDialogComponent;
  let fixture: ComponentFixture<AddPackageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPackageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPackageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
