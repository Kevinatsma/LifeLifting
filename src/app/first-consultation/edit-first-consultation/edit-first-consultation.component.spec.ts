import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFirstConsultationComponent } from './edit-first-consultation.component';

describe('EditFirstConsultationComponent', () => {
  let component: EditFirstConsultationComponent;
  let fixture: ComponentFixture<EditFirstConsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFirstConsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFirstConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
