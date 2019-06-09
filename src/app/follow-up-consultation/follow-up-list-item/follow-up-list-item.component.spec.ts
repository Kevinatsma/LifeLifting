import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowUpListItemComponent } from './follow-up-list-item.component';

describe('FollowUpListItemComponent', () => {
  let component: FollowUpListItemComponent;
  let fixture: ComponentFixture<FollowUpListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowUpListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowUpListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
