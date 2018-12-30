import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSpecialistComponent } from './edit-specialist.component';

describe('EditSpecialistComponent', () => {
  let component: EditSpecialistComponent;
  let fixture: ComponentFixture<EditSpecialistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSpecialistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSpecialistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
