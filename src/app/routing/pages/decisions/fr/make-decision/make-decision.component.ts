import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DecisionService} from '../../../../../domain/services/decision.service';

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
    FormControls = {};
    req: any;

    @Input() case;
    @Input() pageitems;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        public decisionService: DecisionService
    ) {
        this.activatedRoute.params.subscribe( params => console.log("Params=>", params) );
    }
    defineFormControls(item) {
        this.FormControls[item.control] = new FormControl( item.value );
    }

    ngOnInit() {
        this.decision = this.activatedRoute.parent.snapshot.data['decision'];
        this.pageitems = this.decision.meta;
//Don't set value for radio buttons during dynamic bunding. do it after for loop
        let checked = null;
        for (const item of this.pageitems.groups[0].fieldset.radios.radioGroup) {
            if (item.checked) { checked = item.value; }
        }
        this.FormControls[this.pageitems.groups[0].fieldset.radios.control] = new FormControl(checked);
//For buttons
        for (const item of this.pageitems.buttons) {
            this.defineFormControls(item);
        }
        this.formDraft = new FormGroup (this.FormControls);
    }
    onSubmit() {
        const event = this.formDraft.value.createButton;
        delete this.formDraft.value.createButton;
        this.req = { formValues: this.formDraft.value, event: event };
        console.log('POST Will be sent', this.req);
        console.log('to http://localhost:3000/api/decisions/state/fr/1536577824150765/create');
        this.decisionService.submitDecisionDraft('fr','1536577824150765','create', this.req).subscribe(decision => {
            this.decision = decision;
            console.log(decision);
                
            // this.decisionAward = this.options
            //     .filter(option => option.id === this.decision.decision_award)
            //     .map(options => options.name)[0];
            // this.decisionState = this.decision.decision_state.state_name;
            // this.decisionText = this.decision.decision_text;
        });
    }
    //     if (this.formDraft.controls.radioButtons.value === 'no') {
    ///        this.router.navigate([`../reject-reasons/${this.formDraft.controls.radioButtons.value}`], {relativeTo: this.activatedRoute});
    //     } else {
    //         this.router.navigate([`../reject-reasons/${this.formDraft.controls.radioButtons.value}`], {relativeTo: this.activatedRoute});
    //     }

}
