import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMealplanComponent } from './edit-mealplan.component';

describe('EditMealplanComponent', () => {
  let component: EditMealplanComponent;
  let fixture: ComponentFixture<EditMealplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMealplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMealplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
