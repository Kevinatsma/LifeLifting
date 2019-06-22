import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstConsultationListItemComponent } from './first-consultation-list-item.component';

describe('FirstConsultationListItemComponent', () => {
  let component: FirstConsultationListItemComponent;
  let fixture: ComponentFixture<FirstConsultationListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstConsultationListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstConsultationListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
