import { TestBed } from '@angular/core/testing';

import { AddMealDialogService } from './add-meal-dialog.service';

describe('AddMealDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddMealDialogService = TestBed.get(AddMealDialogService);
    expect(service).toBeTruthy();
  });
});
