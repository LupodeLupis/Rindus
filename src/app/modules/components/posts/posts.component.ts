import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { Post, POSTS_TABLE_COLUMNS } from '../../shared/models/posts';
import { PostsEndPointServiceService } from '../../shared/services/end-point/posts-end-point.service';
import { SharingDataService } from '../../shared/services/data-mng/sharing-data.service';
import { CommentsComponent } from './dialog/comments/comments.component';
import { CommonService } from '../../shared/services/common/common.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  postsTableDataSource: MatTableDataSource<Post>;
  postsTableColumns: string[];
  filteredValue: string;

  constructor(
    private dialogService: MatDialog,
    private commonUtilities: CommonService,
    private sharingDataService: SharingDataService,
    private postEndPointService: PostsEndPointServiceService,
    ) {
      this.filteredValue = '',
      this.postsTableColumns = POSTS_TABLE_COLUMNS;
      this.postsTableDataSource = new MatTableDataSource<Post>([]);
    }

  ngOnInit(): void {
    this.getPosts();
    this.getPostId$();
  }

  // retrieve the list of post from external server using RxJS and update the table in the child component
  // display error message in case the call fails
  getPosts(): void {
    this.postEndPointService.getPostsAtEndPoint().subscribe({
      next: (posts: Post[]) => this.postsTableDataSource = new MatTableDataSource<Post>(posts),
      error: (error: HttpErrorResponse) => this.commonUtilities.displayErrorMessage(error.message, error.status),
    });
  }

  // Open the Comments dialog to display the comments that are attached to a specific post
  openCommentsDialog(postId: number) {
    this.dialogService.open(CommentsComponent, {
      width: '1000px',
      disableClose: true,
      data: postId
    });
  }

  /**
   * Listen the changes of the event when the user click 'see message' on the UI. 
   * Receive the post id that is used to open the dialog and show the comments
   */
  getPostId$(): void {
    this.sharingDataService.getPostId$().subscribe({
      next: (id: number) => this.openCommentsDialog(id),
      error: (error: any) => this.commonUtilities.displayErrorMessage('Error while retrieving post id')
    })
  }

}
