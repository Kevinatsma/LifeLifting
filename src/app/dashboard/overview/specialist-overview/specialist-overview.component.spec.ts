import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistOverviewComponent } from './specialist-overview.component';

describe('SpecialistOverviewComponent', () => {
  let component: SpecialistOverviewComponent;
  let fixture: ComponentFixture<SpecialistOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialistOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialistOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
