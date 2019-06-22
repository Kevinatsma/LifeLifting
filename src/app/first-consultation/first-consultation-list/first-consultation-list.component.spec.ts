import { async, ComponentFixture, TestBed } from 'node_modules/@angular/core/testing';
import { FirstConsultationListComponent } from './first-consultation-list.component';

describe('FirstConsultationListComponent', () => {
  let component: FirstConsultationListComponent;
  let fixture: ComponentFixture<FirstConsultationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstConsultationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstConsultationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
