import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstStepSuccessComponent } from './first-step-success.component';

describe('FirstStepSuccessComponent', () => {
  let component: FirstStepSuccessComponent;
  let fixture: ComponentFixture<FirstStepSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstStepSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstStepSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
