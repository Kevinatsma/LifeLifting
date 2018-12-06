import { TestBed } from '@angular/core/testing';

import { NutritionistService } from './nutritionist.service';

describe('NutritionistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NutritionistService = TestBed.get(NutritionistService);
    expect(service).toBeTruthy();
  });
});
