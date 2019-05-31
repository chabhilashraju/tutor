import { TestBed } from '@angular/core/testing';

import { CounsellorServiceService } from './counsellor-service.service';

describe('CounsellorServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CounsellorServiceService = TestBed.get(CounsellorServiceService);
    expect(service).toBeTruthy();
  });
});
