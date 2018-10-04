
import {HttpClient, HttpResponse} from "@angular/common/http";
import { ConfigService } from '../../../../config.service';
import { Injectable } from '@angular/core';
import {IDocumentTask} from "./document-task.model";
import {Observable, Subject} from "rxjs";

@Injectable()
export class NpaService {

    documentTask: Subject<IDocumentTask>;
    outputDmDocumentId: string;
    
    constructor(private configService: ConfigService,
                private httpClient: HttpClient) {
        this.documentTask = new Subject<IDocumentTask>();
    }

    exportPdf(dmDocumentId): Observable<HttpResponse<IDocumentTask>> {
        const url = `${this.configService.config.api_base_url}/api/em-npa/document-tasks`;
        const documentTasks = {
            inputDocumentId: dmDocumentId
        };
        return this.httpClient.post<IDocumentTask>(url, documentTasks, { observe: 'response' });
    }
}
