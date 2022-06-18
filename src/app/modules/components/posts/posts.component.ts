import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { Post, POSTS_TABLE_COLUMNS } from '../../shared/models/posts';
import { PostsEndPointServiceService } from '../../shared/services/end-point/posts-end-point.service';
import { SharingDataService } from '../../shared/services/sharing-data/sharing-data.service';
import { CommentsComponent } from './dialog/comments/comments.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  postsTableDataSource: MatTableDataSource<Post>;
  postsTableColumns: string[];

  constructor( 
    private dialogService: MatDialog,
    private sharingDatService: SharingDataService,
    private postEndPointService: PostsEndPointServiceService,
    ) { 
      this.postsTableColumns = POSTS_TABLE_COLUMNS;
      this.postsTableDataSource = new MatTableDataSource<Post>([]);
    }

  ngOnInit(): void {
    this.getPosts();
    this.getPostId$();
  }


  getPosts() {
    this.postEndPointService.getPostsAtEndPoint().subscribe({
      next: (posts: Post[]) => this.postsTableDataSource = new MatTableDataSource<Post>(posts),
      error: (error: HttpErrorResponse) => {
        console.log('Error..', error)
      }
    });
  }

  openCommentsDialog(postId: string) {
    this.dialogService.open(CommentsComponent, {
      width: '1000px',
      disableClose: true,
      data: postId
    });
  }

  getPostId$() {
    this.sharingDatService.getPostId$().subscribe({
      next: (id:string) => this.openCommentsDialog(id),
      error: (error: any) => {
        console.log('error')  
      }
    });
  }

}
