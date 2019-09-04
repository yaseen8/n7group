import { TestBed } from '@angular/core/testing';

import { GetCurrentLocationService } from './get-current-location.service';

describe('GetCurrentLocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetCurrentLocationService = TestBed.get(GetCurrentLocationService);
    expect(service).toBeTruthy();
  });
});
