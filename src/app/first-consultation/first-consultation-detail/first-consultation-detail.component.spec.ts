import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstConsultationDetailComponent } from './first-consultation-detail.component';

describe('FirstConsultationDetailComponent', () => {
  let component: FirstConsultationDetailComponent;
  let fixture: ComponentFixture<FirstConsultationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstConsultationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstConsultationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
