import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistMenuComponent } from './specialist-menu.component';

describe('SpecialistMenuComponent', () => {
  let component: SpecialistMenuComponent;
  let fixture: ComponentFixture<SpecialistMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialistMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialistMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
