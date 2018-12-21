import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistListItemComponent } from './specialist-list-item.component';

describe('SpecialistListItemComponent', () => {
  let component: SpecialistListItemComponent;
  let fixture: ComponentFixture<SpecialistListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialistListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialistListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
