import {ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef} from '@angular/core';
import {PdfViewerComponent} from './pdf-viewer/pdf-viewer.component';
import {ImgViewerComponent} from './img-viewer/img-viewer.component';
import {Viewer} from './viewer';
import {UnsupportedViewerComponent} from './unsupported-viewer/unsupported-viewer.component';
import {UrlFixerService} from '../url-fixer.service';
import { AnnotationPdfViewerComponent } from '../../hmcts-annotation-ui-lib/viewer/annotation-pdf-viewer/annotation-pdf-viewer.component';
import { AnnotationStoreService } from '../../hmcts-annotation-ui-lib/data/annotation-store.service';

@Injectable()
export class ViewerFactoryService {

    private static determineComponent(mimeType: string, annotate: boolean) {
        if (ViewerFactoryService.isImage(mimeType)) {
            return ImgViewerComponent;
        }
        if (ViewerFactoryService.isPdf(mimeType) && !annotate) {
            return PdfViewerComponent;
        }
        return UnsupportedViewerComponent;
    }

    private static isImage(mimeType: String) {
        return mimeType.startsWith('image/');
    }

    private static isPdf(mimeType: String) {
        return mimeType === 'application/pdf';
    }

    private static getDocumentId(documentMetaData: any) {
        const docArray = documentMetaData._links.self.href.split("/");
        return docArray[docArray.length-1];
    }


    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private annotationStoreService: AnnotationStoreService,
                private urlFixer: UrlFixerService) {
    }

    buildViewer(documentMetaData: any, annotate: boolean, viewContainerRef: ViewContainerRef, baseUrl: string) {
        annotate = true;

        if (ViewerFactoryService.isPdf(documentMetaData.mimeType) && annotate) {
            const componentFactory = 
                this.componentFactoryResolver.resolveComponentFactory(AnnotationPdfViewerComponent);
            viewContainerRef.clear();

            const dmDocumentId = ViewerFactoryService.getDocumentId(documentMetaData);
            this.annotationStoreService.fetchData(dmDocumentId).subscribe(
                (data) => {
                    const componentRef: ComponentRef<any> = viewContainerRef.createComponent(componentFactory);
                    componentRef.instance.dmDocumentId = dmDocumentId;
                    componentRef.instance.annotationData = data;
                    componentRef.instance.url = this.urlFixer.fixDm(documentMetaData._links.binary.href, baseUrl);
                    return componentRef.instance;
            });

        }else{
            const componentToBuild =
                ViewerFactoryService.determineComponent(documentMetaData.mimeType, annotate);
            const componentFactory =
                this.componentFactoryResolver.resolveComponentFactory(componentToBuild);

            viewContainerRef.clear();

            const componentRef: ComponentRef<Viewer> = viewContainerRef.createComponent(componentFactory);
            componentRef.instance.originalUrl = documentMetaData._links.self.href;
            componentRef.instance.url = this.urlFixer.fixDm(documentMetaData._links.binary.href, baseUrl);
            return componentRef.instance;
        }
    }

}
