import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionistItemComponent } from './nutritionist-item.component';

describe('NutritionistItemComponent', () => {
  let component: NutritionistItemComponent;
  let fixture: ComponentFixture<NutritionistItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NutritionistItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NutritionistItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
