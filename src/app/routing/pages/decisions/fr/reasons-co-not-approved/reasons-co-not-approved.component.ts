import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-reasons-co-not-approved',
  templateUrl: './reasons-co-not-approved.component.html',
  styleUrls: ['./reasons-co-not-approved.component.scss']
})
export class ReasonsCoNotApprovedComponent implements OnInit {
    @Input() case;
    rejectReasonsForm: any;
    decision: any;
    options = [];
    Object = Object;
    @Input() idPrefix = 'reject';
    @Input() name = 'reject';
    @Input() fieldset = {
        legend: {
            text: 'Reasons the consent order was not approved',
            isPageHeading: true,
            classes: 'govuk-fieldset__legend--xl'
        }
    };
    @Input() hint = {
        text: 'Select all that apply.'
    };

    @Input() checkboxes = [
        {
            value: 'reject',
            text: 'The parties need to attend a hearing'
        },
        {
            value: 'reject',
            text: 'Not enough information was supplied to decide if the order is fair',
            sub: {
                legend: 'Information required',
                checkboxes: [
                    {
                        value: 'rejectsub',
                        text: 'The parties’ capital positions if the order were to take effect'
                    },
                    {
                        value: 'rejectsub',
                        text: 'The parties’ housing needs and whether they are met by the order'
                    },
                    {
                        value: 'rejectsub',
                        text: 'The justification for departure from equality of capital'
                    },
                    {
                        value: 'rejectsub',
                        text: 'The parties’ pension provision if the order were to take effect'
                    },
                    {
                        value: 'rejectsub',
                        text: 'The children’s housing needs and whether they are met by the order'
                    },
                    {
                        value: 'rejectsub',
                        text: 'The net effect of the order'
                    },
                    {
                        value: 'rejectsub',
                        text: 'Other',
                        sub: {
                            legend: 'What information is needed?',
                            textarea: 'skdjfksjdfh'
                        }
                    }
                ]
            }
        },
        {
            value: 'reject',
            text: 'The D81 form is incomplete'
        },
        {
            value: 'reject',
            text: 'It’s not clear if the applicant has taken independent legal advice'
        },
        {
            value: 'reject',
            text: 'It’s not clear if the respondent has taken independent legal advice'
        },
        {
            value: 'reject',
            text: 'Other',
            sub: {
                legend: 'Reason',
                textarea: 'Some text here'
            }
        }
    ];

    constructor( private route: ActivatedRoute,
                 private router: Router ) {}
    ngOnInit() {
        this.rejectReasonsForm = new FormGroup ({
           // radioButtons: new FormControl ('no')
        });
        this.case = this.route.parent.snapshot.data['caseData'];
        console.log(this.case);

        this.decision = this.route.parent.snapshot.data['decision'];
        console.log(this.decision);
        this.options = this.case.decision.options;
    }
}
