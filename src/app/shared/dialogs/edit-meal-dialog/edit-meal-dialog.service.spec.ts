import { TestBed } from '@angular/core/testing';

import { EditMealDialogService } from './edit-meal-dialog.service';

describe('EditMealDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditMealDialogService = TestBed.get(EditMealDialogService);
    expect(service).toBeTruthy();
  });
});
