import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CaseService {

  constructor(private httpClient: HttpClient) { }


  fetch(caseId): Observable<Object> {
        return this.httpClient.get(`/api/cases/${caseId}`);
  }
}
