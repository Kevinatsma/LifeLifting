import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstConsultHabitsComponent } from './first-consult-habits.component';

describe('FirstConsultHabitsComponent', () => {
  let component: FirstConsultHabitsComponent;
  let fixture: ComponentFixture<FirstConsultHabitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstConsultHabitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstConsultHabitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
