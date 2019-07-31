import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintSuppsComponent } from './print-supps.component';

describe('PrintSuppsComponent', () => {
  let component: PrintSuppsComponent;
  let fixture: ComponentFixture<PrintSuppsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintSuppsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintSuppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
