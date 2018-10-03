import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommentsComponent } from './components/comments/comments.component';
import { CommentItemComponent } from './components/comments/comment-item/comment-item.component';
import { CommentFormComponent } from './components/comments/comment-form/comment-form.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AnnotationStoreService } from './data/annotation-store.service';
import { PdfAdapter } from './data/store-adapter';
import { NpaService } from './data/npa.service';

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
    ToolbarComponent,
  ],
  providers: [
    AnnotationStoreService,
    PdfAdapter,
    NpaService
  ],
  exports: [
    ToolbarComponent,
    CommentsComponent
  ]
})
export class AnnotationUiLibModule { }
