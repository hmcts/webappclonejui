import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, Output, EventEmitter } from '@angular/core';
import { AnnotationService } from '../../data/annotation.service';
import { AnnotationStoreService } from '../../data/annotation-store.service';
import { NpaService } from '../../data/npa.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnChanges {

  @ViewChild("highlightTool") highlightTool: ElementRef;
  @ViewChild("pointerTool") pointerPool: ElementRef;

  @Input() dmDocumentId: string;
  @Input() tool: string;
  @Output() toolChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private annotationService: AnnotationService,
              private annotationStoreService: AnnotationStoreService,
              private npaService: NpaService) {
  }

  ngOnInit() {
    this.handlePointerClick();
  }

  ngOnChanges() {
    if (this.tool == 'cursor') {
      this.annotationService.setCursorTool();
    } else {
      this.annotationService.setHighlightTool();
    }
  }

  handleHighlightClick() {
    this.tool = 'highlight';
    this.toolChange.emit(this.tool);
  }

  handleClearAnnotations() {
    this.annotationStoreService.clearAnnotations();
  }

  handlePointerClick() {
    this.tool = 'cursor';
    this.toolChange.emit(this.tool);
  }

  onSaveClick() {
    this.annotationStoreService.saveData();
  }

  onExportClick() {
    this.npaService.exportPdf(this.dmDocumentId);
  }

}