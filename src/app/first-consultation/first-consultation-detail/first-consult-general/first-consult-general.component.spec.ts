import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstConsultGeneralComponent } from './first-consult-general.component';

describe('FirstConsultGeneralComponent', () => {
  let component: FirstConsultGeneralComponent;
  let fixture: ComponentFixture<FirstConsultGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstConsultGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstConsultGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
