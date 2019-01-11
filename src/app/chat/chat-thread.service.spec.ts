import { TestBed, inject } from '@angular/core/testing';

import { ChatThreadService } from './chat-thread.service';

describe('ChatThreadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatThreadService]
    });
  });

  it('should be created', inject([ChatThreadService], (service: ChatThreadService) => {
    expect(service).toBeTruthy();
  }));
});
