import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../config.service';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import 'rxjs/operators/map';

@Injectable()
export class QuestionService {
    constructor(private http: HttpClient, private configService: ConfigService, private state: TransferState) {
    }

    fetch(caseId, questionId): Observable<Object> {
        const url = `${this.configService.config.api_base_url}/api/cases/${caseId}/questions/${questionId}`;
        const key = makeStateKey(url);
        const cache = this.state.get(key, null as any);

        if (cache) return of(cache);

        return this.http.get(url)
                   .pipe(map(data => {
                       this.state.set(key, data);
                       return data;
                   }));
    }

    create(caseId, question) {
        return this.http
                   .post(`${this.configService.config.api_base_url}/api/cases/${caseId}/questions`, question);
    }

    update(caseId, questionId, question) {
        return this.http
                   .put(`${this.configService.config.api_base_url}/api/cases/${caseId}/questions/${questionId}`, question);
    }

    remove(caseId, questionId) {
        return this.http
                   .delete(`${this.configService.config.api_base_url}/api/cases/${caseId}/questions/${questionId}`);
    }

    save(caseId, question) {
        /**
         * To Do
         */
    }
}
