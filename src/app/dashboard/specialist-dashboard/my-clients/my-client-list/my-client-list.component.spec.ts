import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyClientListComponent } from './my-client-list.component';

describe('MyClientListComponent', () => {
  let component: MyClientListComponent;
  let fixture: ComponentFixture<MyClientListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyClientListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyClientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
