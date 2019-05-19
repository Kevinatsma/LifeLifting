import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodListItemComponent } from './food-list-item.component';

describe('FoodListItemComponent', () => {
  let component: FoodListItemComponent;
  let fixture: ComponentFixture<FoodListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
