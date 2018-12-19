import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupStepFourComponent } from './signup-step-four.component';

describe('SignupStepFourComponent', () => {
  let component: SignupStepFourComponent;
  let fixture: ComponentFixture<SignupStepFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupStepFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupStepFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
