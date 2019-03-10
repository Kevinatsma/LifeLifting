import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuesdayFormComponent } from './tuesday-form.component';

describe('TuesdayFormComponent', () => {
  let component: TuesdayFormComponent;
  let fixture: ComponentFixture<TuesdayFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuesdayFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuesdayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
