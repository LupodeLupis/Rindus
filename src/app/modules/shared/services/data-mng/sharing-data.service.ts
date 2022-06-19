/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private postId$ = new Subject<number>();

  constructor() { }

  getPostId$() {
    return this.postId$.asObservable();
  }

  notifyPostId$(postId: number) {
    this.postId$.next(postId);
  }

}
