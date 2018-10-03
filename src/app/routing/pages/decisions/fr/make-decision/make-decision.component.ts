import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DecisionService} from '../../../../../domain/services/decision.service';
import {FormsService} from '../../../../../shared/services/forms.service';

@Component({
  selector: 'app-make-decision',
  templateUrl: './make-decision.component.html',
  styleUrls: ['./make-decision.component.scss']
})
export class MakeDecisionComponent implements OnInit {
    formDraft: any;
    draft: string;
    options: any;
    decision: any;
    req: any;
    pageValues: any;

    @Input() case;
    @Input() pageitems;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        public decisionService: DecisionService,
        private formsService: FormsService
    ) {}
    ngOnInit() {
        this.activatedRoute.params.subscribe();
        this.decision = this.activatedRoute.parent.snapshot.data['decision'];
        this.pageitems = this.decision.meta;
        this.pageValues = this.decision.formValues;
        this.formDraft = new FormGroup(this.formsService.defineformControls(this.pageitems, this.pageValues));
    }
    onSubmit() {
        const event = this.formDraft.value.createButton.toLowerCase();
        delete this.formDraft.value.createButton;
        this.req = { formValues: this.formDraft.value, event: event };
        // console.log(`to http://localhost:3000/api/decisions/state/fr/${this.activatedRoute.snapshot.parent.data.caseData.id}/${this.pageitems.name}`);
        this.decisionService.submitDecisionDraft('fr',this.activatedRoute.snapshot.parent.data.caseData.id, this.pageitems.name, this.req).subscribe(decision => {
            console.log(decision.newRoute);
            this.router.navigate([`../${decision.newRoute}`], {relativeTo: this.activatedRoute});
        });
    }
}
