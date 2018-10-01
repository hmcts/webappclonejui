import { Component, OnInit, ViewChild, ElementRef, Inject, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { AnnotationService } from '../../data/annotation.service';
import { UrlFixerService } from '../../../document-viewer/url-fixer.service';
import { Viewer } from '../../../document-viewer/viewers/viewer';

@Component({
  selector: 'app-annotation-pdf-viewer',
  templateUrl: './annotation-pdf-viewer.component.html',
  styleUrls: ['./annotation-pdf-viewer.component.scss'],
  providers: []
})

export class AnnotationPdfViewerComponent implements OnInit, OnChanges {

  renderedPages: {};
  dmDocumentId: string;
  url = '';
  page: number;
  tool: String;

  @ViewChild("contentWrapper") contentWrapper: ElementRef;

  constructor(private urlFixer: UrlFixerService,
              private annotationService: AnnotationService, 
              private route: ActivatedRoute,
              @Inject(DOCUMENT) private document: any) {
  }

  ngOnInit() {
    // From resolver
    this.route.data.subscribe((data) => {
      // Get the case data and select a pdf to load
      this.dmDocumentId = this.route.snapshot.params.pdf_id
      const dmDocuments = data.caseData.documents;
      
      dmDocuments.forEach(dmDocument => {
        if (dmDocument.id == this.dmDocumentId) {
          this.url = this.urlFixer.fixDm(dmDocument._links.binary.href, "http://localhost:3000/api");
        }
      });
      
      this.annotationService.annotationData = data.annotationData;
      this.annotationService.preRun();
    });

    this.annotationService.setRenderOptions({
      documentId: this.url,
      pdfDocument: null,
      scale: parseFloat("1.33"),
      rotate: parseInt(localStorage.getItem(this.url + '/rotate'), 10) || 0
    });

    this.renderedPages = {};
    this.annotationService.render();
    this.page = 1;
    this.annotationService.setPageNumber(1);
    this.tool = 'cursor';
  }

  ngOnChanges() {
  }

  getClickedPage(event) {
    let currentParent = event.target;
    for (let step = 0; step < 5; step++) {
        const pageNumber = currentParent.parentNode.getAttribute('data-page-number');
        if (pageNumber != null) {
          this.annotationService.setPageNumber(parseInt(pageNumber));
          break;
        };
      currentParent = currentParent.parentNode;
    }
    this.tool = 'cursor';
  }

	handlePdfScroll(event) {
    const element = event.srcElement as HTMLInputElement;
    const visiblePageNum = Math.round(element.scrollTop / 1056) + 1; // Hardcoded page height as 1056
    
    const visiblePage = this.document.querySelector('.page[data-page-number="' + visiblePageNum + '"][data-loaded="false"]');

		if (visiblePage && !this.renderedPages[visiblePageNum]) {
			// Prevent invoking UI.renderPage on the same page more than once.
        this.renderedPages[visiblePageNum] = true;
        setTimeout(this.annotationService.renderPage(visiblePageNum));
    }
    if (this.page != visiblePageNum) {
      this.page = visiblePageNum;
      if (!isNaN(visiblePageNum)) {
        this.annotationService.setPageNumber(visiblePageNum);
      }
    }
  }
}
