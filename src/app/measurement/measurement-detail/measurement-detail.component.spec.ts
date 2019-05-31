import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementDetailComponent } from './measurement-detail.component';

describe('MeasurementDetailComponent', () => {
  let component: MeasurementDetailComponent;
  let fixture: ComponentFixture<MeasurementDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasurementDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
