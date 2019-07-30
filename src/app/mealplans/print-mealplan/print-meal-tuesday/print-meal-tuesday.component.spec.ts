import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintMealTuesdayComponent } from './print-meal-tuesday.component';

describe('PrintMealTuesdayComponent', () => {
  let component: PrintMealTuesdayComponent;
  let fixture: ComponentFixture<PrintMealTuesdayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintMealTuesdayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintMealTuesdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
