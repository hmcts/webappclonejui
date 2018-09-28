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
        console.log(this.formDraft.value);
        console.log('Will be sent');
        console.log('http://localhost:3000/api/decisions/state/1536577824150765/fr/create');

    }
    //     if (this.formDraft.controls.radioButtons.value === 'no') {
    ///        this.router.navigate([`../reject-reasons/${this.formDraft.controls.radioButtons.value}`], {relativeTo: this.activatedRoute});
    //     } else {
    //         this.router.navigate([`../reject-reasons/${this.formDraft.controls.radioButtons.value}`], {relativeTo: this.activatedRoute});
    //     }

}
