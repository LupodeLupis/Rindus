import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CommentEndPointService } from './comment-end-point.service';
import { Comment } from '../../../shared/models/comments'
import { HttpErrorResponse } from '@angular/common/http';

const POST_ID = 1;
const COMMENTS: Comment[] = [
  {
    postId: 1,
    id: 1,
    name: "id labore ex et quam laborum",
    email: "Eliseo@gardner.biz",
    body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
  },
  {
    postId: 1,
    id: 2,
    name: "quo vero reiciendis velit similique earum",
    email: "Jayne_Kuhic@sydney.com",
    body: "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
  },
  {
    postId: 1,
    id: 3,
    name: "odio adipisci rerum aut animi",
    email: "Nikita@garfield.biz",
    body: "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione"
  },
]

describe('CommentEndPointService', () => {
  let commentEndPointService: CommentEndPointService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule
      ],
      providers: []
    });
    commentEndPointService = TestBed.inject(CommentEndPointService);
    httpTestingController = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(commentEndPointService).toBeTruthy();
  });

  it('should test mocking API call to external server and retrieve a list of comments attached to a specif post', () => {
    commentEndPointService.getCommentsByPostIdAtEndPoint(POST_ID).subscribe((posts: Comment[]) => {
      expect(posts).toEqual(COMMENTS);
      expect(posts).toBeDefined();
      expect(posts.length).toEqual(3);
    });
    const req = httpTestingController.expectOne(`https://jsonplaceholder.typicode.com/posts/${POST_ID}/comments`); // only one request sent to the external server
    expect(req.request.method).toEqual('GET');
    req.flush(COMMENTS); // mock the response
  })

  it('should test mocking API call to external server to retrieve post list with error 404', () => {
    commentEndPointService.getCommentsByPostIdAtEndPoint(POST_ID).subscribe({
      next: (comments: Comment[]) => {},
      error: (error: HttpErrorResponse) => {
        expect(error.error).toEqual('Error while retrieving comments');
        expect(error.status).toEqual(404);
        expect(error.message).toEqual('Http failure response for https://jsonplaceholder.typicode.com/posts/1/comments: 404 Not Found')
      }
    });
    const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/posts/1/comments');
    expect(req.request.method).toEqual('GET');
    // respond with an error to test how its handled, in this case a 404
    const errorMessage = 'Error while retrieving comments';
    req.flush(errorMessage, { status: 404, statusText: 'Not Found'});
  });


});
