import { Component } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AnnotationStoreService } from '../data/annotation-store.service';

@Component({
  selector: 'aui-annotation-resolver',
  template: ''
})
export class AnnotationResolver implements Resolve<any> {

  constructor(private annotationStoreService: AnnotationStoreService) {}

  resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.annotationStoreService.fetchData(route.params.pdf_id);
  }
}
