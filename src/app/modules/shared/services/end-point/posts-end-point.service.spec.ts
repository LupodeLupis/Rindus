import { TestBed } from '@angular/core/testing';

import { PostsEndPointServiceService } from './posts-end-point.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Post } from '../../models/posts';
import { HttpErrorResponse } from '@angular/common/http';

const POSTS: Post[] = [
  {
    userId: 1,
    id: 1,
    title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam" +
          "nostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis" +
    "voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  },
  {
    userId: 1,
    id: 3,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae" +
          "porro eius odio et labore et velit aut"
  },
]

describe('PostsEndPointServiceService', () => {
  let postsEndPointServiceService: PostsEndPointServiceService;
  let httpTestingController: HttpTestingController;
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule // Http client mocking service
      ],
      providers: [ ]
    });
    postsEndPointServiceService = TestBed.inject(PostsEndPointServiceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });


  it('should be created', () => {
    expect(postsEndPointServiceService).toBeTruthy();
  });

  it('should test mocking API call to external server and retrieve posts', () => {
    postsEndPointServiceService.getPostsAtEndPoint().subscribe((posts: Post[]) => {
      expect(posts).toEqual(POSTS);
      expect(posts).toBeDefined();
      expect(posts.length).toEqual(3);
    });
    const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/posts'); // only one request sent to the external server
    expect(req.request.method).toEqual('GET');
    req.flush(POSTS); // mock the response
  })

  it('should test mocking API call to external server to retrieve post list with error 404', () => {
    postsEndPointServiceService.getPostsAtEndPoint().subscribe({
      next: (post: Post[]) => {},
      error: (error: HttpErrorResponse) => {
        expect(error.error).toEqual('Error while retrieving posts');
        expect(error.status).toEqual(404);
        expect(error.message).toEqual('Http failure response for https://jsonplaceholder.typicode.com/posts: 404 Not Found')
      }
    });
    const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/posts');
    expect(req.request.method).toEqual('GET');
    // respond with an error to test how its handled, in this case a 404
    const errorMessage = 'Error while retrieving posts';
    req.flush(errorMessage, { status: 404, statusText: 'Not Found'});
  });
});
