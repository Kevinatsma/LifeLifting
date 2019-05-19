import { TestBed } from '@angular/core/testing';

import { GuidelineService } from './guideline.service';

describe('GuidelineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuidelineService = TestBed.get(GuidelineService);
    expect(service).toBeTruthy();
  });
});
