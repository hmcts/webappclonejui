import { v4 as uuid } from 'uuid';
import { Comment } from '../viewer/comments/comment-model';

declare const PDFAnnotate: any;

export class PdfAdapter {
    data: any;
    commentData: any[];
    annotationSetId: number;

    setStoreData(data) {
        this.data = data.annotations;
        this.commentData = [];
        this.data.forEach(annotation => {
            annotation.comments.forEach(comment => {
                this.commentData.push(comment);
            }); 
        });
        this.annotationSetId = data.id;
    }

    editComment(comment: Comment) {
        this.data.forEach(annotation => {
            annotation.comments.forEach(
            storeComment => {
                if (storeComment.id == comment.id) {
                    storeComment.content = comment.content;
                };
            })
        });
    }

    updateComments(documentId, comment) {
        this.commentData.push(comment);
    }

    _getAnnotations(documentId) {
        return this.data || [];
    }

    _getComments(documentId) {
        return this.commentData || [];
    }

    getStoreAdapter() {
        
        let getAnnotations = (documentId, pageNumber) => {
            return new Promise((resolve, reject) => {
                var annotations = this._getAnnotations(documentId).filter(function (i) {
                    return i.page === pageNumber;
                  });
                resolve({
                    documentId: documentId,
                    pageNumber: pageNumber,
                    annotations: annotations
                  });
            }); 
        };

        let getComments = (documentId, annotationId) => {
            return new Promise((resolve, reject) => {
                resolve(this._getComments(documentId).filter(function (i) {
                    return i.annotationId === annotationId;
                  }));
            });
        };

        let getAnnotation = (documentId, annotationId) => {
            return new Promise(function(resolve, reject) {
                resolve(this.data.comments);
            });
        };

        let addAnnotation = (documentId, pageNumber, annotation) => {
            return new Promise((resolve, reject) => {
                annotation.id = uuid();
                annotation.page = pageNumber;
                annotation.annotationSetId = this.annotationSetId;
                annotation.rectangles.forEach(
                    rectangle => {
                      rectangle.id = uuid();
                    });

                let annotations = this._getAnnotations(documentId);
                annotations.push(annotation);
      
                resolve(annotation);
            });
        };

        let deleteAnnotation = (documentId, annotationId) => {
            return new Promise((resolve, reject) => {
                this.data = this.remove(this.data, annotationId);
                resolve(this.data);
            });
        };

        let addComment = (documentId, annotationId, content) => {
            return new Promise((resolve, reject) => {
                var comment = {
                    class: 'Comment',
                    id: uuid(),
                    annotationId: annotationId,
                    content: content,
                    createdDate: new Date(),
                    createdBy: null,
                  };

                this.updateComments(documentId, comment);
                resolve(comment); 
            });
        };

        let deleteComment = (documentId, commentId) => {
            return new Promise((resolve, reject) => {
                this.commentData = this.remove(this.commentData, commentId);
                resolve(this.data.comments);
            });
        };

        // Unused
        let editAnnotation = (documentId, pageNumber, annotation) => {
            return new Promise(function(resolve, reject) {
                resolve(this.data.comments);
            });
        };

        return new PDFAnnotate.StoreAdapter({
            getAnnotations,
            getComments,
            getAnnotation,
            addAnnotation,
            editAnnotation,
            deleteAnnotation,
            addComment,
            deleteComment
        })
    }

    remove(array, element) {
        return array.filter(e => e.id !== element);
    }
}