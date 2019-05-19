import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRequestListComponent } from './event-request-list.component';

describe('EventRequestListComponent', () => {
  let component: EventRequestListComponent;
  let fixture: ComponentFixture<EventRequestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventRequestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
