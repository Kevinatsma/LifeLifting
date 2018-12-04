import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNutritionistComponent } from './add-nutritionist.component';

describe('AddNutritionistComponent', () => {
  let component: AddNutritionistComponent;
  let fixture: ComponentFixture<AddNutritionistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNutritionistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNutritionistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
