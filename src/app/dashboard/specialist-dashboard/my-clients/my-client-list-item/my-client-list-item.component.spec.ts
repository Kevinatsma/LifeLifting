import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyClientListItemComponent } from './my-client-list-item.component';

describe('MyClientListItemComponent', () => {
  let component: MyClientListItemComponent;
  let fixture: ComponentFixture<MyClientListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyClientListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyClientListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
