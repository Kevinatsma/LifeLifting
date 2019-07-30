import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintMealMondayComponent } from './print-meal-monday.component';

describe('PrintMealMondayComponent', () => {
  let component: PrintMealMondayComponent;
  let fixture: ComponentFixture<PrintMealMondayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintMealMondayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintMealMondayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
