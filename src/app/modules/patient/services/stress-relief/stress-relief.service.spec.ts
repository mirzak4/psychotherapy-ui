import { TestBed } from '@angular/core/testing';

import { StressReliefService } from './stress-relief.service';

describe('StressReliefService', () => {
  let service: StressReliefService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StressReliefService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
