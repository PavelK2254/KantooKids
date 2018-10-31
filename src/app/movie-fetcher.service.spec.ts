import { TestBed } from '@angular/core/testing';

import { MovieFetcherService } from './movie-fetcher.service';

describe('MovieFetcherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MovieFetcherService = TestBed.get(MovieFetcherService);
    expect(service).toBeTruthy();
  });
});
