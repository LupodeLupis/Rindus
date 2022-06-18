import { TestBed } from '@angular/core/testing';

import { CommentEndPointService } from './comment-end-point.service';

describe('CommentEndPointService', () => {
  let service: CommentEndPointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentEndPointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
