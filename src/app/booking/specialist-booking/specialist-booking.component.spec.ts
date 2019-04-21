import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistBookingComponent } from './specialist-booking.component';

describe('SpecialistBookingComponent', () => {
  let component: SpecialistBookingComponent;
  let fixture: ComponentFixture<SpecialistBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialistBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialistBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
