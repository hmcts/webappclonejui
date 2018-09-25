import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-hearing-details',
  templateUrl: './hearing-details.component.html',
  styleUrls: ['./hearing-details.component.scss']
})
export class HearingDetailsComponent implements OnInit {
    hearingDetailsForm:any;
    constructor() { }

    ngOnInit() {
        this.hearingDetailsForm = new FormGroup ({
            radioButtons: new FormControl ('no')
        });
    }

}
