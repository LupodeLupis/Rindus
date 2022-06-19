import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private postId$: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  getPostId$(): Observable<number> {
    return this.postId$.asObservable();
  }

  setPostId(id: number) {
    this.postId$.emit(id);
  }
}
