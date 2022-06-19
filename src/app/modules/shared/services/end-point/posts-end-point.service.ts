/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Post } from '../../models/posts';

@Injectable({
  providedIn: 'root'
})
export class PostsEndPointServiceService {

  constructor( private http: HttpClient ) { }


  getPostsAtEndPoint(): Observable<Post[]> {
    return new Observable((observer: Observer<Post[]> ) => {
      this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe({
        next: (response: any) => observer.next(response),
        error: (error: HttpErrorResponse) => observer.error(error),
        complete: () => observer.complete()
      });
    });
  }

}
