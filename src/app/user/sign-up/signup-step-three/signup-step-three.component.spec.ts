import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupStepThreeComponent } from './signup-step-three.component';

describe('SignupStepThreeComponent', () => {
  let component: SignupStepThreeComponent;
  let fixture: ComponentFixture<SignupStepThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupStepThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupStepThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
