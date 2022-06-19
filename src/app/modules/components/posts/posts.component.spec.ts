import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, Observer, of } from 'rxjs';


import { SearchComponent } from '../../shared/components/search/search.component';
import { Post, POSTS_TABLE_COLUMNS } from '../../shared/models/posts';
import { CommonService } from '../../shared/services/common/common.service';
import { SharingDataService } from '../../shared/services/data-mng/sharing-data.service';
import { PostsEndPointServiceService } from '../../shared/services/end-point/posts-end-point.service';
import { SharedModule } from '../../shared/shared.modules';
import { CommentsComponent } from './dialog/comments/comments.component';
import { PostsComponent } from './posts.component';

// fake data to be used to mock the API call to external server
const POSTS: Post[] = [
  {
    userId: 1,
    id: 1,
    title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam" +
          "nostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis" +
    "voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  },
  {
    userId: 1,
    id: 3,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae" +
          "porro eius odio et labore et velit aut"
  },
]

describe('PostsComponent', () => {
  let matDialog: MatDialog;
  let component: PostsComponent;
  let commonUtilitiesService: CommonService;
  let sharingDataService: SharingDataService;
  let fixture: ComponentFixture<PostsComponent>;
  let postsEndPointService: PostsEndPointServiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        PostsComponent,
        SearchComponent
       ],
      imports: [
        SharedModule,
        BrowserAnimationsModule
      ],
      providers:[
        CommonService,
        SharingDataService,
        PostsEndPointServiceService,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    matDialog = TestBed.inject(MatDialog);
    commonUtilitiesService = TestBed.inject(CommonService);
    sharingDataService = TestBed.inject(SharingDataService);
    postsEndPointService = TestBed.inject(PostsEndPointServiceService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.filteredValue).toBeFalsy();
    expect(component.postsTableColumns).toBeDefined();
    expect(component.postsTableColumns).toEqual(POSTS_TABLE_COLUMNS);
    expect(component.postsTableDataSource.data).toEqual([]);
  });

  it('should test if functions within hook ngOnit are called', () => {
    spyOn(component, 'getPosts');
    spyOn(component, 'getPostId$');
    component.ngOnInit();
    expect(component.getPosts).toHaveBeenCalled();
    expect(component.getPostId$).toHaveBeenCalled();
  });

  it('should test to retrieve list of post from external sever without error', () => {
    spyOn(commonUtilitiesService, 'displayErrorMessage');
    spyOn(postsEndPointService, 'getPostsAtEndPoint').and.callFake(() => {
      return new Observable((observer: Observer<Post[]>) => {
        observer.next(POSTS);
      });
    });
    component.getPosts();
    expect(postsEndPointService.getPostsAtEndPoint).toHaveBeenCalled();
    expect(component.postsTableDataSource.data).toEqual(POSTS);
    expect(commonUtilitiesService.displayErrorMessage).not.toHaveBeenCalled();
  });

  it('should test to retrieve list of post from external sever with error', () => {
    spyOn(commonUtilitiesService, 'displayErrorMessage');
    spyOn(postsEndPointService, 'getPostsAtEndPoint').and.callFake(() => {
      return new Observable((observer:Observer<Post[]>) => {
        observer.error({message: 'Error while retriving posts', status: 404})
      });
    });
    component.getPosts();
    expect(postsEndPointService.getPostsAtEndPoint).toHaveBeenCalled();
    expect(component.postsTableDataSource.data).toEqual([]);
    expect(commonUtilitiesService.displayErrorMessage).toHaveBeenCalled();
    expect(commonUtilitiesService.displayErrorMessage).toHaveBeenCalledWith('Error while retriving posts', 404);
  });

  it('should test to open the dialog to display the Comments list based on post id', () => {
    const postId = 1;
    const spyOnDialog = spyOn(matDialog, 'open');
    component.openCommentsDialog(1);
    expect(spyOnDialog).toHaveBeenCalledWith(CommentsComponent, {
      width: '1000px',
      disableClose: true,
      data: postId
    });
  });

  it('should test on receiving the post id with event emitter ', () => {
    spyOn(commonUtilitiesService, 'displayErrorMessage');
    spyOn(sharingDataService, 'getPostId$').and.returnValue(of(1));
    spyOn(component, 'openCommentsDialog');
    component.getPostId$();
    expect(component.openCommentsDialog).toHaveBeenCalledWith(1);
    expect(sharingDataService.getPostId$).toHaveBeenCalled();
    expect(commonUtilitiesService.displayErrorMessage).not.toHaveBeenCalled();
  });

  it('should test receiving the post id with event emitter with error', () => {
    spyOn(commonUtilitiesService, 'displayErrorMessage');
    spyOn(sharingDataService , 'getPostId$').and.callFake(() => {
      return new Observable((observer: Observer<any>) => {
        observer.error('Error while retrieving post id')
      })
    });
    component.getPostId$();
    expect(commonUtilitiesService.displayErrorMessage).toHaveBeenCalledWith('Error while retrieving post id')

  })
});
