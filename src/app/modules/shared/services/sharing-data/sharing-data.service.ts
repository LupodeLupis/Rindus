import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private postId$: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  getPostId$(): Observable<string>{
    return this.postId$;
  }

  setPostId(id: string) {
    this.postId$.emit(id);
  }
}
