import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpBookingComponent } from './signup-booking.component';

describe('SignUpBookingComponent', () => {
  let component: SignUpBookingComponent;
  let fixture: ComponentFixture<SignUpBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
