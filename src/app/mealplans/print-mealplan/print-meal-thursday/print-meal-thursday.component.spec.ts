import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintMealThursdayComponent } from './print-meal-thursday.component';

describe('PrintMealThursdayComponent', () => {
  let component: PrintMealThursdayComponent;
  let fixture: ComponentFixture<PrintMealThursdayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintMealThursdayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintMealThursdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
