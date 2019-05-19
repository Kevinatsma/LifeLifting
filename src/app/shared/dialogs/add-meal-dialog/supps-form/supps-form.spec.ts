import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppsFormComponent } from './supps-form.component';

describe('SuppsFormComponent', () => {
  let component: SuppsFormComponent;
  let fixture: ComponentFixture<SuppsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
