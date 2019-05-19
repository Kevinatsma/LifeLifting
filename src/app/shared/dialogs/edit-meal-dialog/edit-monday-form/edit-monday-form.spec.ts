import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMondayFormComponent } from './edit-monday-form.component';

describe('EditMondayFormComponent', () => {
  let component: EditMondayFormComponent;
  let fixture: ComponentFixture<EditMondayFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMondayFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMondayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
