import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFirstConsultationComponent } from './add-first-consultation.component';

describe('AddFirstConsultationComponent', () => {
  let component: AddFirstConsultationComponent;
  let fixture: ComponentFixture<AddFirstConsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFirstConsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFirstConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
