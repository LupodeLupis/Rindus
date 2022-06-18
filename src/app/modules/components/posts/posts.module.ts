import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { SharedModule } from '../../shared/shared.modules';
import { CommentsComponent } from './dialog/comments/comments.component';


@NgModule({
  declarations: [
    PostsComponent,
    CommentsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PostsRoutingModule
  ]
})
export class PostsModule { }
