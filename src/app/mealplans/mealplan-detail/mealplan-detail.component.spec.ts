import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealplanDetailComponent } from './mealplan-detail.component';

describe('MealplanDetailComponent', () => {
  let component: MealplanDetailComponent;
  let fixture: ComponentFixture<MealplanDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealplanDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealplanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
