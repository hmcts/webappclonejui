import { Injectable } from '@angular/core';
import { Comment } from '../components/comments/comment-model';
import { AnnotationService } from './annotation.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from '../../../../config.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

declare const PDFAnnotate: any;

@Injectable()
export class AnnotationStoreService {
  pageNumber: number;

  constructor(private annotationService: AnnotationService,
              private httpClient: HttpClient,
              private configService: ConfigService) {   
  }

  fetchData(dmDocumentId): Observable<any> {
    const url = `${this.configService.config.api_base_url}/api/em-anno/annotation-sets/${dmDocumentId}`;
    return this.httpClient.get(url).pipe(
          catchError((err) => { 
          if( err instanceof HttpErrorResponse) {
              switch(err.status) {
                  case 400: {
                      return Observable.throw(err.error);
                  }
                  case 404: {
                      return this.httpClient.post(`${this.configService.config.api_base_url}/api/em-anno/annotation-sets`, 
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
    }));
  };

  saveData() {
    let loadedData = this.annotationService.pdfAdapter.loadedData;
    const toKeepAnnotations = loadedData.annotations
          .filter((annotation) => this.annotationService.pdfAdapter.annotations.includes(annotation));

    const toRemoveAnnotations = loadedData.annotations
          .filter((annotation) => !this.annotationService.pdfAdapter.annotations.includes(annotation));

    loadedData.annotations = toKeepAnnotations;

    loadedData.annotations.forEach(annotation => {
      const saveAnnotation = {
        id: annotation.id,
        type: annotation.type,
        rectangles: annotation.rectangles,
        color: annotation.color,
        page: annotation.page,
        annotationSetId: annotation.annotationSetId,
        comments: annotation.comments
      };

      this.saveAnnotationApi(saveAnnotation).subscribe(
        response => console.log(response),
        error => console.log(error)
      );
    });

    toRemoveAnnotations.forEach(annotation => {
      this.deleteAnnotationApi(annotation).subscribe(
        response => console.log(response),
        error => console.log(error)
      );
    });

    this.annotationService.pdfAdapter.loadedData = loadedData;
  }

  clearAnnotations() {
    if (confirm('Are you sure you want to clear annotations?')) {
      this.annotationService.pdfAdapter.annotations = [];
      // for (let i = 0; i < this.pdfPages; i++) {
      //   document.querySelector('div#pageContainer' + (i + 1) + ' svg.annotationLayer').innerHTML = '';
      // }
      // localStorage.removeItem(this.RENDER_OPTIONS.documentId + '/annotations');
    }
  }

  deleteAnnotationApi(annotation): Observable<any> {
    const url = `${this.configService.config.api_base_url}/api/em-anno/annotations/${annotation.id}`;
    return this.httpClient.delete(url);
  }

  saveAnnotationApi(annotation): Observable<any> {
    const url = `${this.configService.config.api_base_url}/api/em-anno/annotations`;
    return this.httpClient.post(url, annotation);
  }

  deleteComment(commentId: string) {
    PDFAnnotate.getStoreAdapter()
      .deleteComment(this.annotationService.getRenderOptions().documentId, commentId)
      .then();
  }
  
  editComment(comment: Comment){
      this.annotationService.pdfAdapter.editComment(comment);
  }

  getAnnotationById(annotationId: any): any {
		let promise = new Promise((resolve, error) => {
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
    let promise = new Promise((resolve, error) => {
      this.getAnnotations(pageNumber,
        pageData => {
          resolve(pageData);
        })
    });
    return promise;
  }

  getCommentsForAnnotation(annotationId) {
    let promise = new Promise((resolve, error) => {
      this.getComments(
        annotationId, 
        comments => {
          resolve(comments);
        }
      );
    });
    return promise;
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

  addComment(comment: Comment ) {
    PDFAnnotate.getStoreAdapter()
      .addComment(this.annotationService.getRenderOptions().documentId, comment.annotationId, comment.content)
      .then();
  }

  getAnnotations(pageNumber: number, callback) {
    PDFAnnotate.getStoreAdapter()
      .getAnnotations(this.annotationService.getRenderOptions().documentId, pageNumber)
      .then(callback);
  }
}
