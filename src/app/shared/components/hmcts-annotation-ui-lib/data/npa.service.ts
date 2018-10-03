
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../../../../config.service';

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
  