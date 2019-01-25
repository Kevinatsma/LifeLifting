import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGuidelineComponent } from './edit-guideline.component';

describe('EditGuidelineComponent', () => {
  let component: EditGuidelineComponent;
  let fixture: ComponentFixture<EditGuidelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGuidelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGuidelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
