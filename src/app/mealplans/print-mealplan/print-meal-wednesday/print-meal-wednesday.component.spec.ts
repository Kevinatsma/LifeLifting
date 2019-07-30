import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintMealWednesdayComponent } from './print-meal-wednesday.component';

describe('PrintMealWednesdayComponent', () => {
  let component: PrintMealWednesdayComponent;
  let fixture: ComponentFixture<PrintMealWednesdayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintMealWednesdayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintMealWednesdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
