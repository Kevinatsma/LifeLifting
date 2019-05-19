import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRequestListItemComponent } from './event-request-list-item.component';

describe('EventRequestListItemComponent', () => {
  let component: EventRequestListItemComponent;
  let fixture: ComponentFixture<EventRequestListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventRequestListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventRequestListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
