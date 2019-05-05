import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditThursdayFormComponent } from './edit-thursday-form.component';

describe('EditThursdayFormComponent', () => {
  let component: EditThursdayFormComponent;
  let fixture: ComponentFixture<EditThursdayFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditThursdayFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditThursdayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
