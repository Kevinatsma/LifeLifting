import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealplanListItemComponent } from './mealplan-list-item.component';

describe('MealplanListItemComponent', () => {
  let component: MealplanListItemComponent;
  let fixture: ComponentFixture<MealplanListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealplanListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealplanListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
