import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySpecialistComponent } from './my-specialist.component';

describe('MySpecialistComponent', () => {
  let component: MySpecialistComponent;
  let fixture: ComponentFixture<MySpecialistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySpecialistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySpecialistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
