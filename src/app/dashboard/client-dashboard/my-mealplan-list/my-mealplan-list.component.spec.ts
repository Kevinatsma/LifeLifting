import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMealplanListComponent } from './my-mealplan-list.component';

describe('MyMealplanListComponent', () => {
  let component: MyMealplanListComponent;
  let fixture: ComponentFixture<MyMealplanListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMealplanListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMealplanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
