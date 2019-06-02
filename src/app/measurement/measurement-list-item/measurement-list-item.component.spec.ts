import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementListItemComponent } from './measurement-list-item.component';

describe('MeasurementListItemComponent', () => {
  let component: MeasurementListItemComponent;
  let fixture: ComponentFixture<MeasurementListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasurementListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
