import { TestBed } from '@angular/core/testing';

import { TutorServiceService } from './tutor-service.service';

describe('TutorServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TutorServiceService = TestBed.get(TutorServiceService);
    expect(service).toBeTruthy();
  });
});
