import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstConsultBodyComponent } from './first-consult-body.component';

describe('FirstConsultBodyComponent', () => {
  let component: FirstConsultBodyComponent;
  let fixture: ComponentFixture<FirstConsultBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstConsultBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstConsultBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
