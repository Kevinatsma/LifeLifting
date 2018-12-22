import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpecialistDialogComponent } from './add-specialist-dialog.component';

describe('AddSpecialistDialogComponent', () => {
  let component: AddSpecialistDialogComponent;
  let fixture: ComponentFixture<AddSpecialistDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSpecialistDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSpecialistDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
