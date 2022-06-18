import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CommentEndPointService } from 'src/app/modules/shared/services/end-point/comment-end-point.service';
import { SharingDataService } from 'src/app/modules/shared/services/sharing-data/sharing-data.service';
import { Comment, COMMENTS_TABLE_COLUMNS } from '../../../../shared/models/comments'

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  
  commentsTableDataSource!: MatTableDataSource<Comment>;
  commentsTableComuns: string[];
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public postId: string,
    private dialogRef: MatDialogRef<CommentsComponent>,
    private commentEndPointService: CommentEndPointService,
  ) { 
    this.commentsTableComuns = COMMENTS_TABLE_COLUMNS;
  }

  ngOnInit(): void {
    this.getPostMessage();
  }

  // Close the dialog by pressing ESC
  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }

  getPostMessage() {
    this.commentEndPointService.getMessageByPostIdAtEndPoint(this.postId).subscribe({
      next: (comments: Comment[]) =>  this.commentsTableDataSource = new MatTableDataSource<Comment>(comments),
      error: (error: HttpErrorResponse) => {
        console.log('Error while retriving comments', error)
      }
    });
  }


}
