import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './components/comments/comments.component';
import { CommentItemComponent } from './components/comments/comment-item/comment-item.component';
import { CommentFormComponent } from './components/comments/comment-form/comment-form.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AnnotationStoreService } from './data/annotation-store.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PdfAdapter } from './data/store-adapter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    CommentsComponent,
    CommentItemComponent,
    CommentFormComponent,
    ToolbarComponent
  ],
  providers: [
    AnnotationStoreService,
    PdfAdapter
  ],
  exports: [
    ToolbarComponent,
    CommentsComponent
  ]
})
export class AnnotationUiLibModule { }
