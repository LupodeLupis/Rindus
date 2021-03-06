/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Comment } from '../../models/comments';

@Injectable({
  providedIn: 'root'
})
export class CommentEndPointService {

  constructor(
    private http: HttpClient
  ) { }


  getCommentsByPostIdAtEndPoint(postid: number): Observable<Comment[]> {
    return new Observable((observer: Observer<Comment[]> ) => {
      this.http.get<Comment[]>(`https://jsonplaceholder.typicode.com/posts/${postid}/comments`).subscribe({
        next: (response: Comment[]) => observer.next(response),
        error: (error: HttpErrorResponse) => observer.error(error),
        complete: () => observer.complete()
      });
    });
  }

}
