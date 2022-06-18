import { TestBed } from '@angular/core/testing';

import { PostsEndPointServiceService } from './posts-end-point-service.service';

describe('PostsEndPointServiceService', () => {
  let service: PostsEndPointServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsEndPointServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
