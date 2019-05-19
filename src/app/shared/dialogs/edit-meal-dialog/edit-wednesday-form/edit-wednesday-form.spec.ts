import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWednesdayFormComponent } from './edit-wednesday-form.component';

describe('EditWednesdayFormComponent', () => {
  let component: EditWednesdayFormComponent;
  let fixture: ComponentFixture<EditWednesdayFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWednesdayFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWednesdayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
