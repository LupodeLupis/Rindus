import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { CommentEndPointService } from '../../../../shared/services/end-point/comment-end-point.service';
import { Comment, COMMENTS_TABLE_COLUMNS } from '../../../../shared/models/comments'
import { GenericButton } from '../../../../shared/models/buttons';
import { CommonService } from '../../../../shared/services/common/common.service';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
    
    
    filteredValue: string;
    commentsTableComuns: string[];
    closeDialogConfigButton: GenericButton;
    cancelDialogConfigButton: GenericButton;
    commentsTableDataSource!: MatTableDataSource<Comment>;


    constructor(
        @Inject(MAT_DIALOG_DATA) public postId: number,
        private commonUtilitiesService: CommonService,
        private dialogRef: MatDialogRef<CommentsComponent>,
        private commentEndPointService: CommentEndPointService,
    ) { 
        this.filteredValue = '';
        this.commentsTableComuns = COMMENTS_TABLE_COLUMNS; 
        this.closeDialogConfigButton = this.commonUtilitiesService.initializeCloseConfigButton('Comments Table');
        this.cancelDialogConfigButton = this.commonUtilitiesService.initializeCancelConfigButton();
    }


    ngOnInit(): void {
        this.getPostComments();
    }

    // Close the dialog by pressing ESC
    @HostListener('window:keyup.esc') onKeyUp() {
        this.dialogRef.close();
    }

    // retrieve the list of post from external server using RxJS and update the table in the child component
    // display error message in case the call fails
    getPostComments() {
        this.commentEndPointService.getCommentsByPostIdAtEndPoint(this.postId).subscribe({
            next: (comments: Comment[]) => this.commentsTableDataSource = new MatTableDataSource<Comment>(comments),
            error: (error: HttpErrorResponse) => this.commonUtilitiesService.displayErrorMessage(error.message, error.status)
        });
    }

}
