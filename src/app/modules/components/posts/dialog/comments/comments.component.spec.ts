import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, Observer } from 'rxjs';
import { ButtonsComponent } from '../../../../shared/components/buttons/buttons.component';
import { SearchComponent } from '../../../../shared/components/search/search.component';
import { CommonService } from '../../../../shared/services/common/common.service';
import { CommentEndPointService } from '../../../../shared/services/end-point/comment-end-point.service';
import { SharedModule } from '../../../../shared/shared.modules';

import { CommentsComponent } from './comments.component';
import { Comment } from '../../../../shared/models/comments'


const POST_ID = 1;
const COMMENTS: Comment[] = [
  {
    postId: 1,
    id: 1,
    name: "id labore ex et quam laborum",
    email: "Eliseo@gardner.biz",
    body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
  },
  {
    postId: 1,
    id: 2,
    name: "quo vero reiciendis velit similique earum",
    email: "Jayne_Kuhic@sydney.com",
    body: "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et"
  },
  {
    postId: 1,
    id: 3,
    name: "odio adipisci rerum aut animi",
    email: "Nikita@garfield.biz",
    body: "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione"
  },
]

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let commonUtilitiesService: CommonService;
  let fixture: ComponentFixture<CommentsComponent>;
  let commentEndPointService: CommentEndPointService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        SearchComponent,
        ButtonsComponent,
        CommentsComponent,
       ],
      imports: [
        SharedModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: POST_ID },

      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    commonUtilitiesService = TestBed.inject(CommonService);
    commentEndPointService = TestBed.inject(CommentEndPointService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.filteredValue).toBeFalsy();
    expect(component.commentsTableDataSource).toBeUndefined();
    expect(component.closeDialogConfigButton).toEqual({
      action: 'close',
      text: 'Comments Table',
      icon: 'close'
    });
    expect(component.cancelDialogConfigButton).toEqual({ action: 'cancel', text: 'Cancel'});
  });

  it('should test on calling the function withn ngOnit hook', () => {
    spyOn(component, 'getPostComments');
    component.ngOnInit();
    expect(component.getPostComments).toHaveBeenCalled();
  });

  it('should test on retrieving the list of comments associated with a post without error', () => {
    spyOn(commentEndPointService, 'getCommentsByPostIdAtEndPoint').and.callFake(( id: number) => {
      return new Observable((observer: Observer<Comment[]>) => observer.next(COMMENTS));
    });
    spyOn(commonUtilitiesService, 'displayErrorMessage');
    component.getPostComments();
    expect(commentEndPointService.getCommentsByPostIdAtEndPoint).toHaveBeenCalled();
    expect(component.commentsTableDataSource.data).toEqual(COMMENTS);
    expect(commonUtilitiesService.displayErrorMessage).not.toHaveBeenCalled();
  });

  it('should test on retriving the list of comments associated with a post with error', () => {
    spyOn(commentEndPointService, 'getCommentsByPostIdAtEndPoint').and.callFake(( id: number) => {
      return new Observable((observer: Observer<Comment[]>) => observer.error({message: 'Error while retrieving comments', status: 404}));
    });
    spyOn(commonUtilitiesService, 'displayErrorMessage');
    component.getPostComments();
    expect(commentEndPointService.getCommentsByPostIdAtEndPoint).toHaveBeenCalled();
    expect(component.commentsTableDataSource).toBeUndefined();
    expect(commonUtilitiesService.displayErrorMessage).toHaveBeenCalledWith('Error while retrieving comments', 404);
  });
});
