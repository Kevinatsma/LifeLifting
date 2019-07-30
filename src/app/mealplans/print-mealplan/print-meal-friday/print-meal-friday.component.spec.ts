import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintMealFridayComponent } from '././print-meal-friday.component';

describe('PrintMealFridayComponent', () => {
  let component: PrintMealFridayComponent;
  let fixture: ComponentFixture<PrintMealFridayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintMealFridayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintMealFridayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
