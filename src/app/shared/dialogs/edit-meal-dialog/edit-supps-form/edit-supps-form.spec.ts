import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSuppsFormComponent } from './edit-supps-form.component';

describe('EditSuppsFormComponent', () => {
  let component: EditSuppsFormComponent;
  let fixture: ComponentFixture<EditSuppsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSuppsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSuppsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
