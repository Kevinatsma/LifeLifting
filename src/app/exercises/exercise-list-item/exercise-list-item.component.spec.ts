import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseListItemComponent } from './exercise-list-item.component';

describe('ExerciseListItemComponent', () => {
  let component: ExerciseListItemComponent;
  let fixture: ComponentFixture<ExerciseListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
