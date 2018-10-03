import {NgModule} from '@angular/core';
import {DocumentViewerComponent} from './document-viewer.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {ViewerFactoryService} from './viewers/viewer-factory.service';
// import {PdfViewerComponent} from './viewers/pdf-viewer/pdf-viewer.component';
import {UnsupportedViewerComponent} from './viewers/unsupported-viewer/unsupported-viewer.component';
import {ImgViewerComponent} from './viewers/img-viewer/img-viewer.component';
import {ViewerAnchorDirective} from './viewers/viewer-anchor.directive';
import {UrlFixerService} from './url-fixer.service';
import {DocumentViewerService} from './document-viewer.service';
import { AnnotationUiLibModule } from '../hmcts-annotation-ui-lib/annotation-ui-lib.module';
import { AnnotationPdfViewerComponent } from '../hmcts-annotation-ui-lib/viewer/annotation-pdf-viewer/annotation-pdf-viewer.component';
import { AnnotationService } from '../hmcts-annotation-ui-lib/data/annotation.service';
import { AnnotationStoreService } from '../hmcts-annotation-ui-lib/data/annotation-store.service';
import { PdfAdapter } from '../hmcts-annotation-ui-lib/data/store-adapter';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@NgModule({
    declarations: [
        DocumentViewerComponent,
        AnnotationPdfViewerComponent,
        // PdfViewerComponent,
        ImgViewerComponent,
        UnsupportedViewerComponent,
        ViewerAnchorDirective
    ],
    entryComponents: [
        // PdfViewerComponent,
        AnnotationPdfViewerComponent,
        ImgViewerComponent,
        UnsupportedViewerComponent
    ],
    exports: [DocumentViewerComponent],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AnnotationUiLibModule
    ],
    providers: [
        ViewerFactoryService,
        UrlFixerService,
        DocumentViewerService,
        AnnotationService,
        AnnotationStoreService,
        PdfAdapter
    ],
})
export class DocumentViewerModule {
}
