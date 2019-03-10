import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppsComponent } from './supps.component';

describe('SuppsComponent', () => {
  let component: SuppsComponent;
  let fixture: ComponentFixture<SuppsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
