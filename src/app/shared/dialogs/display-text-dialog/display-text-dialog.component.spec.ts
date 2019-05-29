import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTextDialogComponent } from './display-text-dialog.component';

describe('DisplayTextDialogComponent', () => {
  let component: DisplayTextDialogComponent;
  let fixture: ComponentFixture<DisplayTextDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayTextDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayTextDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
