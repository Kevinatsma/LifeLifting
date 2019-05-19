import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseMealplanDialogComponent } from './choose-mealplan-dialog.component';

describe('ChooseMealplanDialogComponent', () => {
  let component: ChooseMealplanDialogComponent;
  let fixture: ComponentFixture<ChooseMealplanDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseMealplanDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseMealplanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
