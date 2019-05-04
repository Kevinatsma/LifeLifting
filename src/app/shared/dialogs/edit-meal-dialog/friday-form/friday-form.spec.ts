import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FridayFormComponent } from './friday-form.component';

describe('FridayFormComponent', () => {
  let component: FridayFormComponent;
  let fixture: ComponentFixture<FridayFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FridayFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FridayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
