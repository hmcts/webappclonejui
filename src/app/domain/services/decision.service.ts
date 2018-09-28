import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import 'rxjs-compat/add/observable/of';
import {ConfigService} from '../../config.service';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router, UrlSegment } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class DecisionService {
    constructor(
            private httpClient: HttpClient,
            private configService: ConfigService,
            private state: TransferState,
            private activatedRoute: ActivatedRoute,
            private router: Router
    ) { }

    generateDecisionUrl(caseId: string, jurId: string, pageId: string) {
        //old Mike implementation          return `${this.configService.config.api_base_url}/api/decisions/${caseId}`;
        if (pageId === undefined) { pageId = 'create';}
        if (jurId === undefined) { jurId = 'fr'}
        return `${this.configService.config.api_base_url}/api/decisions/state/${caseId}/${jurId}/${pageId}`;
    }

    fetch(caseId, jurId, pageId): Observable<any> {
        const url = this.generateDecisionUrl(caseId, jurId, pageId);

        console.log(url);
        //this.router.events.subscribe((url:any) => console.log(url));

        //console.log(this.router.url);
        //console.log("router", this.activatedRoute );
        //
        // const key = makeStateKey(url);
        // const cache = this.state.get(key, null as any);
        //
        // if (cache) return of(cache);
        return this.httpClient.get(url);
    }

    submitDecisionDraft(caseId: string, award: string, text: string): Observable<any> {
        const url = this.generateDecisionUrl(caseId, 'decision');
        const body = {
            decision_award: award,
            decision_header: award,
            decision_reason: text,
            decision_text: text
        };
        return this.httpClient.post(url, body);
    }

    updateDecisionDraft(caseId: string, award: string, text: string) {
        const url = this.generateDecisionUrl(caseId);
        const body = {
            decision_award: award,
            decision_header: award,
            decision_reason: text,
            decision_text: text,
            decision_state: 'decision_drafted'
        };
        return this.httpClient.put(url, body);
    }

    issueDecision(caseId: string, decision: any): Observable<any>  {
        const url = this.generateDecisionUrl(caseId);

        const body = {
            decision_award: decision.decision_award,
            decision_header: decision.decision_header,
            decision_reason: decision.decision_reason,
            decision_text: decision.decision_text,
            decision_state: 'decision_issue_pending'
        };
        return this.httpClient.put(url, body);
    }

}
