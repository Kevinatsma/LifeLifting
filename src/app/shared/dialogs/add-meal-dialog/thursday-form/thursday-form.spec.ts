import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThursdayFormComponent } from './thursday-form.component';

describe('ThursdayFormComponent', () => {
  let component: ThursdayFormComponent;
  let fixture: ComponentFixture<ThursdayFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThursdayFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThursdayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
