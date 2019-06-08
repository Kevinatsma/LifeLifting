import { TestBed } from '@angular/core/testing';

import { FollowUpConsultationService } from './follow-up-consultation.service';

describe('FollowUpConsultationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FollowUpConsultationService = TestBed.get(FollowUpConsultationService);
    expect(service).toBeTruthy();
  });
});
