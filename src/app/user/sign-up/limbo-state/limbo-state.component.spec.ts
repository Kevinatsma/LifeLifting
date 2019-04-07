import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LimboStateComponent } from './limbo-state.component';

describe('LimboStateComponent', () => {
  let component: LimboStateComponent;
  let fixture: ComponentFixture<LimboStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LimboStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LimboStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
