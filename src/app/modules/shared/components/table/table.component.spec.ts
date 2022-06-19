/* eslint-disable @typescript-eslint/no-explicit-any */
import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableDataSource } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { SharingDataService } from '../../services/data-mng/sharing-data.service';
import { SharedModule } from '../../shared.modules';
import { TableComponent } from './table.component';
import { Comment  } from '.././../models/comments';

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
];



describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let sharingDataService: SharingDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        TableComponent 
      ],
      imports: [
        SharedModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    sharingDataService = TestBed.inject(SharingDataService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test on set the post id', () => {
    const postId = 1;
    spyOn(sharingDataService, 'notifyPostId$');
    component.setPostId(postId);
    expect(sharingDataService.notifyPostId$).toHaveBeenCalledWith(postId);
  });

  it('should test in initilize table data, sorting and pagination', () => {

    component.tableDataSource = new MatTableDataSource<any>(COMMENTS);
    component.ngOnChanges({
      tableDataSource: new SimpleChange(null, new MatTableDataSource<any>(COMMENTS), false),
    })
    expect(component.tableDataSource.data).toEqual(COMMENTS);
    expect(component.tableDataSource.paginator).toBeDefined();
    expect(component.tableDataSource.sort).toBeDefined();
    expect(component.tableDataSource.filter).toBeFalsy()
  });

  it('should test in initilize filter input', () => {
    component.tableDataSource = new MatTableDataSource<any>(COMMENTS);
    component.ngOnChanges({
      filteredValue: new SimpleChange(null, 'Testing Filter', true),
    })
    expect(component.tableDataSource.filter).toEqual('testing filter');
  });
});
