import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidelineListItemComponent } from './guideline-list-item.component';

describe('GuidelineListItemComponent', () => {
  let component: GuidelineListItemComponent;
  let fixture: ComponentFixture<GuidelineListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuidelineListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidelineListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
