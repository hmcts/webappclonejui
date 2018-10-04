
import {HttpClient, HttpResponse} from "@angular/common/http";
import { ConfigService } from '../../../../config.service';
import { Injectable } from '@angular/core';
import {IDocumentTask} from "./document-task.model";
import {Observable} from "rxjs";

@Injectable()
export class NpaService {

    constructor(private configService: ConfigService,
                private httpClient: HttpClient) {

    }

    exportPdf(dmDocumentId): Observable<HttpResponse<IDocumentTask>> {
        const url = `${this.configService.config.api_base_url}/api/em-npa/document-tasks`;
        const documentTasks = {
            inputDocumentId: dmDocumentId
        };
        return this.httpClient.post<IDocumentTask>(url, documentTasks, { observe: 'response' });
    }

}
