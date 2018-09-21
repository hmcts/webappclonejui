import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {

    @Input() idPrefix = 'waste';
    @Input() name = 'waste';
    @Input() fieldset = {
        legend: {
            text: 'Which types of waste do you transport?',
            isPageHeading: true,
            classes: 'govuk-fieldset__legend--xl'
        }
    };
    @Input() hint = {
        text: 'Select all that apply.'
    };
    @Input() items;
    // @Input() items = [
    //     {
    //         value: 'carcasses',
    //         text: 'Waste from animal carcasses'
    //     },
    //     {
    //         value: 'mines',
    //         text: 'Waste from mines or quarries'
    //     },
    //     {
    //         value: 'farm',
    //         text: 'Farm or agricultural waste'
    //     }
    // ];

    constructor() { }

}
