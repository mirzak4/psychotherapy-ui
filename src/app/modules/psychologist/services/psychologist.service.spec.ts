import { TestBed } from '@angular/core/testing';

import { PsychologistService } from './psychologist.service';

describe('PsychologistService', () => {
  let service: PsychologistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PsychologistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
