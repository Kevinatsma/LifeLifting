import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidelineDetailComponent } from './guideline-detail.component';

describe('GuidelineDetailComponent', () => {
  let component: GuidelineDetailComponent;
  let fixture: ComponentFixture<GuidelineDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuidelineDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidelineDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
