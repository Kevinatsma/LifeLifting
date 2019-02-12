import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WednesdayFormComponent } from './wednesday-form.component';

describe('WednesdayFormComponent', () => {
  let component: WednesdayFormComponent;
  let fixture: ComponentFixture<WednesdayFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WednesdayFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WednesdayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
