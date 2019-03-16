import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGuidelineListComponent } from './my-guideline-list.component';

describe('MyGuidelineListComponent', () => {
  let component: MyGuidelineListComponent;
  let fixture: ComponentFixture<MyGuidelineListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyGuidelineListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyGuidelineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
