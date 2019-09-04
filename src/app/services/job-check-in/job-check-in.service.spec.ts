import { TestBed } from '@angular/core/testing';

import { JobCheckInService } from './job-check-in.service';

describe('JobCheckInService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobCheckInService = TestBed.get(JobCheckInService);
    expect(service).toBeTruthy();
  });
});
