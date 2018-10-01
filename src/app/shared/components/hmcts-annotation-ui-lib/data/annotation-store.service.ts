import { Injectable } from '@angular/core';
import { Comment } from '../viewer/comments/comment-model';
import { AnnotationService } from './annotation.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from '../../../../config.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

declare const PDFAnnotate: any;

@Injectable()
export class AnnotationStoreService {

  constructor(private annotationService: AnnotationService,
              private httpClient: HttpClient,
              private configService: ConfigService,) { }

  annotationSetId: number;

  deleteComment(commentId: string, callback) {
    PDFAnnotate.getStoreAdapter()
    .deleteComment(this.annotationService.getRenderOptions().documentId, commentId)
    .then(callback);
  }
  
  editComment(comment: Comment, callback){
    PDFAnnotate.getStoreAdapter()
    .editComment(this.annotationService.getRenderOptions().documentId, comment)
    .then(callback);

    // const localKey = this.annotationService.getRenderOptions().documentId + "/annotations";
    // const annotations = localStorage.getItem(localKey);
    // let jsonAnnotations = JSON.parse(annotations);

    // jsonAnnotations.forEach(element => {
    //   if (element.id === comment.id){
    //     element.content = comment.content;
    //   }
    // });

    // localStorage.setItem(localKey, JSON.stringify(jsonAnnotations));
    // callback;
  }

  getAnnotationById(annotationId: any): any {
		var promise = new Promise((resolve, error) => {
      this.getAnnotation(
        annotationId, 
        annotation => {
          resolve(annotation);
        })
      }
    );
    return promise;
	}

  getAnnotationsForPage(pageNumber) {
    var promise = new Promise((resolve, error) => {
      this.getAnnotations(pageNumber,
        pageData => {
          resolve(pageData);
        })
    });
    return promise;
  }

  getCommentsForAnnotation(annotationId) {
    var promise = new Promise((resolve, error) => {
      this.getComments(
        annotationId, 
        comments => {
          comments.forEach(element => {
              element.createdDate = this.getCommentDate(annotationId);
              element.author = this.getCommentAuthor(annotationId);
          });
          resolve(comments);
        }
      );
    });
    return promise;
  }

  getCommentDate(annotationId) {
    return new Date();
  }

  getCommentAuthor(annotationId) {
    return "test author";
  }

  getAnnotation(annotationId: string, callback) {
    PDFAnnotate.getStoreAdapter()
    .getAnnotation(this.annotationService.getRenderOptions().documentId, annotationId)
		.then(callback);
  }

  getComments(annotationId: string, callback) {
    PDFAnnotate.getStoreAdapter()
    .getComments(this.annotationService.getRenderOptions().documentId, annotationId)
		.then(callback);
  }

  addComment(comment: Comment, callback ) {
    PDFAnnotate.getStoreAdapter()
		.addComment(this.annotationService.getRenderOptions().documentId, comment.annotationId, comment.content)
		.then(callback);
  }

  getAnnotations(pageNumber: number, callback) {
    PDFAnnotate.getStoreAdapter()
		.getAnnotations(this.annotationService.getRenderOptions().documentId, pageNumber)
		.then(callback);
  }

  fetchData(dmDocumentId): Observable<any> {
    const url = `${this.configService.config.api_base_url}/api/annotation/annotation-sets/${dmDocumentId}`;
    return this.httpClient.get(url).pipe(
          catchError((err) => { 
          if( err instanceof HttpErrorResponse) {
              switch(err.status) {
                  case 400: {
                      return Observable.throw(err.error);
                  }
                  case 404: {
                      return this.httpClient.post(`${this.configService.config.api_base_url}/api/annotation/annotation-sets`, 
                      {
                        documentId: dmDocumentId, 
                        id: uuid()
                      }
                    );
                  }
                  case 500:{
                      return Observable.throw(new Error('Internal server error: ' + err));
                  }
             }
          }
      }))
    };
}
