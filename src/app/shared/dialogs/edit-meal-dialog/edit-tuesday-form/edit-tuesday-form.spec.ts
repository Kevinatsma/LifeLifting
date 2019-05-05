import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTuesdayFormComponent } from './edit-tuesday-form.component';

describe('EditTuesdayFormComponent', () => {
  let component: EditTuesdayFormComponent;
  let fixture: ComponentFixture<EditTuesdayFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTuesdayFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTuesdayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
