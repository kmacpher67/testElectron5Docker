import { TestBed } from '@angular/core/testing';

import { PrintReadyService } from './print-ready.service';

describe('PrintReadyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrintReadyService = TestBed.get(PrintReadyService);
    expect(service).toBeTruthy();
  });
});
