import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyClientDetailComponent } from './my-client-detail.component';

describe('MyClientDetailComponent', () => {
  let component: MyClientDetailComponent;
  let fixture: ComponentFixture<MyClientDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyClientDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyClientDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
