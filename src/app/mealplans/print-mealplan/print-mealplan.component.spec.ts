import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintMealplanComponent } from './print-mealplan.component';

describe('PrintMealplanComponent', () => {
  let component: PrintMealplanComponent;
  let fixture: ComponentFixture<PrintMealplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintMealplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintMealplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
