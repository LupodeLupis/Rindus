import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonsComponent } from 'src/app/modules/shared/components/buttons/buttons.component';
import { SearchComponent } from 'src/app/modules/shared/components/search/search.component';
import { CommonService } from 'src/app/modules/shared/services/common/common.service';
import { CommentEndPointService } from 'src/app/modules/shared/services/end-point/comment-end-point.service';
import { SharedModule } from 'src/app/modules/shared/shared.modules';

import { CommentsComponent } from './comments.component';

const POST_ID = 1

fdescribe('CommentsComponent', () => {
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
    commonUtilitiesService = TestBed.inject(CommonService)
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

  })

  it('should test on retrieving the list of comments associated with a post', () => {

  })
});
