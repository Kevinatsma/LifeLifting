import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstConsultBasicComponent } from './first-consult-basic.component';

describe('FirstConsultBasicComponent', () => {
  let component: FirstConsultBasicComponent;
  let fixture: ComponentFixture<FirstConsultBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstConsultBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstConsultBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
