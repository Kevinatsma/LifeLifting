import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFridayFormComponent } from './edit-friday-form.component';

describe('EditFridayFormComponent', () => {
  let component: EditFridayFormComponent;
  let fixture: ComponentFixture<EditFridayFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFridayFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFridayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
