import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGuideDialogComponent } from './add-guide-dialog.component';

describe('AddGuideDialogComponent', () => {
  let component: AddGuideDialogComponent;
  let fixture: ComponentFixture<AddGuideDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGuideDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGuideDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
