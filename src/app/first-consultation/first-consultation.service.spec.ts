import { TestBed } from '@angular/core/testing';

import { FirstConsultationService } from './first-consultation.service';

describe('FirstConsultationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirstConsultationService = TestBed.get(FirstConsultationService);
    expect(service).toBeTruthy();
  });
});
