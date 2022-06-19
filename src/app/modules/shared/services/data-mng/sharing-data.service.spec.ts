import { TestBed } from '@angular/core/testing';

import { SharingDataService } from './sharing-data.service';

fdescribe('SharingDataService', () => {
  let service: SharingDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharingDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
