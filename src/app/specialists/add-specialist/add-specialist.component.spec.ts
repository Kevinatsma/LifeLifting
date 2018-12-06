import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpecialistComponent } from './add-specialist.component';

describe('AddNutritionistComponent', () => {
  let component: AddSpecialistComponent;
  let fixture: ComponentFixture<AddSpecialistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSpecialistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSpecialistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
