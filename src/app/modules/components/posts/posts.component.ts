import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Post } from '../../shared/models/posts';
import { PostsEndPointServiceService } from '../../shared/services/posts-end-point-service.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  postsTableDataSource: MatTableDataSource<Post[]> = new MatTableDataSource();
  
  constructor( 
    private postEndPointService: PostsEndPointServiceService
    ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postEndPointService.getPostsAtEndPoint().subscribe({
      next: (posts: Post[]) => {
        console.log('this is the list of posts', posts)
      },
      error: (error: HttpErrorResponse) => {
        console.log('Error..', error)
      }
    })
  }

}
