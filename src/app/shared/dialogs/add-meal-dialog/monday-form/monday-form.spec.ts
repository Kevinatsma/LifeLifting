import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MondayFormComponent } from './monday-form.component';

describe('MondayFormComponent', () => {
  let component: MondayFormComponent;
  let fixture: ComponentFixture<MondayFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MondayFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MondayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
