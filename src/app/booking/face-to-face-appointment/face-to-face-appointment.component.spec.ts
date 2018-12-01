import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceToFaceAppointmentComponent } from './face-to-face-appointment.component';

describe('FaceToFaceAppointmentComponent', () => {
  let component: FaceToFaceAppointmentComponent;
  let fixture: ComponentFixture<FaceToFaceAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaceToFaceAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceToFaceAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
