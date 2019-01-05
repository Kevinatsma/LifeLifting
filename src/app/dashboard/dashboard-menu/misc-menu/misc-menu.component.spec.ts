import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscMenuComponent } from './misc-menu.component';

describe('MiscMenuComponent', () => {
  let component: MiscMenuComponent;
  let fixture: ComponentFixture<MiscMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiscMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
