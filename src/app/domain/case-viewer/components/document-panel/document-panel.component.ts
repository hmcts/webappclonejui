import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfigService} from '../../../../config.service';

@Component({
    selector: 'app-document-panel',
    templateUrl: './document-panel.component.html',
    styleUrls: ['./document-panel.component.scss']
})
export class DocumentPanelComponent implements OnInit {

    @Input() panelData;
    @Input() docList: any;
    documents: any[] = [];
    selectedDocument: any;
    documentUrl: string;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private configService: ConfigService) {
        this.documentUrl = `${configService.config.api_base_url}/api`;
    }

    getDocuments() {
        let docIds = [];

        if (this.panelData.fields) {
            docIds = this.panelData.fields
                .map(f => f.value)
                .reduce((a, b) => (a || []).concat(b))
                .filter(x => !!x)
                .map(x => x.id);
        }

        let docs = this.docList
            .filter(document => {
                const splitURL = document._links.self.href.split('/');
                const id = splitURL[splitURL.length - 1];
                return docIds.indexOf(id) > -1;
            });

        docs.sort((a, b) => {
            const dateA = new Date(a.createdOn);
            const dateB = new Date(b.createdOn);
            return dateA < dateB;
        });

        docs = docs.map(doc => {
            return {
                id: doc.id,
                name: doc.originalDocumentName,
                url: doc._links.self.href
            };
        });

        this.documents = docs;
    }


    ngOnInit(): void {
        this.getDocuments();

        if (this.documents.length) {
            this.route.params.subscribe(params => {
                if (params['section_item_id']) {
                    this.selectedDocument = this.documents.filter(doc => doc.id === params['section_item_id'])[0];
                } else {
                    this.router.navigate([`${this.documents[0].id}`], {relativeTo: this.route});
                }
            });
        }
    }
}
