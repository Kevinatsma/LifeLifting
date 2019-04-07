import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCalendarClientComponent } from './my-calendar-client.component';

describe('MyCalendarClientComponent', () => {
  let component: MyCalendarClientComponent;
  let fixture: ComponentFixture<MyCalendarClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCalendarClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCalendarClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
