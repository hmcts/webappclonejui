import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-make-decision',
  templateUrl: './make-decision.component.html',
  styleUrls: ['./make-decision.component.scss']
})
export class MakeDecisionComponent implements OnInit {
    formDraft: any;
    draft: string;

    @Input() items = [
        {
            value: 'yes',
            text: 'Yes'
        },
        {
            value: 'no',
            text: 'No'
        }
    ];

    constructor(private router: Router, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.params.subscribe( params => console.log(params) );
    }

    ngOnInit() {
        this.formDraft = new FormGroup ({
            radioButtons: new FormControl ('no')
        });
    }


    onSubmit() {
        if (this.formDraft.controls.radioButtons.value === 'no') {
            this.router.navigate([`../reject-reasons/${this.formDraft.controls.radioButtons.value}`], {relativeTo: this.activatedRoute});
        } else {
            this.router.navigate([`../reject-reasons/${this.formDraft.controls.radioButtons.value}`], {relativeTo: this.activatedRoute});
        }
    }
}
