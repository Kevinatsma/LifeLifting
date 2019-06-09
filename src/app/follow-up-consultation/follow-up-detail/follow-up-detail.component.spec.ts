import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowUpDetailComponent } from './follow-up-detail.component';

describe('FollowUpDetailComponent', () => {
  let component: FollowUpDetailComponent;
  let fixture: ComponentFixture<FollowUpDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowUpDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowUpDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
