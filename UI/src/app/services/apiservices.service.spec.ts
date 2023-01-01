import { TestBed } from '@angular/core/testing';

import { APIservicesService } from './apiservices.service';

describe('APIservicesService', () => {
  let service: APIservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APIservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
