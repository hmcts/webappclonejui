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
    FormControls = {};
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
            value: 'partiesNeedAttend',
            text: 'The parties need to attend a hearing'
        },
        {
            value: 'NotEnoughInformation',
            text: 'Not enough information was supplied to decide if the order is fair',
            sub: {
                legend: 'Information required',
                checkboxes: [
                    {
                        value: 'capitalPositions',
                        text: 'The parties’ capital positions if the order were to take effect'
                    },
                    {
                        value: 'partiesHousingNeeds',
                        text: 'The parties’ housing needs and whether they are met by the order'
                    },
                    {
                        value: 'justificationDeparture',
                        text: 'The justification for departure from equality of capital'
                    },
                    {
                        value: 'partiesPensionProvision',
                        text: 'The parties’ pension provision if the order were to take effect'
                    },
                    {
                        value: 'childrensHousingNeeds',
                        text: 'The children’s housing needs and whether they are met by the order'
                    },
                    {
                        value: 'netEffectOrder',
                        text: 'The net effect of the order'
                    },
                    {
                        value: 'Other1',
                        text: 'Other',
                        sub: {
                            legend: 'What information is needed?',
                            value: 'informationNeeded',
                            textarea: ''
                        }
                    }
                ]
            }
        },
        {
            value: 'd81',
            text: 'The D81 form is incomplete'
        },
        {
            value: 'pensionAnnex',
            text: 'The pension annex was not attached'
        },
        {
            value: 'applicantTakenAdvice',
            text: 'It’s not clear if the applicant has taken independent legal advice'
        },
        {
            value: 'respondentTakenAdvice',
            text: 'It’s not clear if the respondent has taken independent legal advice'
        },
        {
            value: 'Other2',
            text: 'Other',
            sub: {
                legend: 'Reason',
                value: 'Reason',
                textarea: ''
            }
        }
    ];

    constructor( private route: ActivatedRoute,
                 private router: Router ) {}
    ngOnInit() {
        for (const item of this.checkboxes) {
            this.FormControls[item.value] = new FormControl ();
            if (item.sub) {
                if (item.sub.checkboxes) {
                    for (const subitem of item.sub.checkboxes) {
                        this.FormControls[subitem.value] = new FormControl();
                    }
                }
            }
        }

        console.log(this.FormControls);

        this.rejectReasonsForm = new FormGroup (this.FormControls);

        this.case = this.route.parent.snapshot.data['caseData'];
        console.log(this.case);

        this.decision = this.route.parent.snapshot.data['decision'];
        console.log(this.decision);
        this.options = this.case.decision.options;
    }
    onSubmit() {
        console.log("Submit=>", this.rejectReasonsForm);
    }
}
