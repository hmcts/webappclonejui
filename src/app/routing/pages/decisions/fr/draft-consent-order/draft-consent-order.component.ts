import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-draft-consent-order',
  templateUrl: './draft-consent-order.component.html',
  styleUrls: ['./draft-consent-order.component.scss']
})
export class DraftConsentOrderComponent implements OnInit {
    draftConsentOrderForm: any;
    constructor() { }

    ngOnInit() {
        this.draftConsentOrderForm = new FormGroup ({

        });
    }

}
