
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../../config.service';
import { Injectable } from '@angular/core';

@Injectable()
export class NpaService {

    constructor(private configService: ConfigService,
                private httpClient: HttpClient) {

    }

    exportPdf(dmDocumentId) {
        const url = `${this.configService.config.api_base_url}/api/em-npa/document-tasks`;
        const documentTasks = {
          inputDocumentId: dmDocumentId
        };
    
        this.httpClient.post(url, documentTasks).subscribe(
          (response:any) => {
            alert(response.outputDocumentId);
            console.log(response);
          },
          error => console.log(error)
        );
      }
}
  