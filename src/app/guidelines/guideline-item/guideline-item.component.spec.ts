import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidelineItemComponent } from './guideline-item.component';

describe('GuidelineItemComponent', () => {
  let component: GuidelineItemComponent;
  let fixture: ComponentFixture<GuidelineItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuidelineItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidelineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
