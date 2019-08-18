import { TestBed } from '@angular/core/testing';

import { GetFeedService } from './get-feed.service';

describe('GetFeedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetFeedService = TestBed.get(GetFeedService);
    expect(service).toBeTruthy();
  });
});
