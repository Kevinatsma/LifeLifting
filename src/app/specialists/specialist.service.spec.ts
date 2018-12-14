import { TestBed } from '@angular/core/testing';

import { SpecialistService } from './specialist.service';

describe('NutritionistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpecialistService = TestBed.get(SpecialistService);
    expect(service).toBeTruthy();
  });
});
