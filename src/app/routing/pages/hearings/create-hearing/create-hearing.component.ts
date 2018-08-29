import {ChangeDetectorRef, Component, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RedirectionService} from '../../../redirection.service';
import {HearingService} from '../../../../domain/services/hearing.data.service';

@Component({
    selector: 'app-list-for-hearing',
    templateUrl: './create-hearing.component.html',
    styleUrls: ['./create-hearing.component.scss']
})
export class CreateHearingComponent implements OnInit {
    form: FormGroup;
    case: any;
    hearing: any;

    relistReasonText = '';

    eventEmitter: EventEmitter<any> = new EventEmitter();
    callback_options = {
        eventEmitter: this.eventEmitter
    };

    error = {
        server: false,
        notes: false
    };

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private hearingService: HearingService,
        public redirectionService: RedirectionService,
        private cdRef: ChangeDetectorRef
    ) { }

    createForm() {
        this.form = this.fb.group({
            notes: [this.relistReasonText, Validators.required],
        });
    }

    ngOnInit() {
        this.hearingService.currentMessage.subscribe(message => this.relistReasonText = message);
        this.eventEmitter.subscribe(this.submitCallback.bind(this));

        this.case = this.route.parent.snapshot.data['caseData'];
        // this.hearing = this.route.parent.snapshot.data['hearing'];
        //
        // if (this.hearing) {
        //     this.relistReasonText = this.hearing.relist_reason;
        // }
        this.createForm();
    }

    ngAfterViewChecked() {
        this.cdRef.detectChanges();
    }

    submitCallback(values) {
        console.log('is form valid?', (this.form.valid));
        if (this.form.valid) {
            this.hearingService.changeMessage(values.notes);
            this.router.navigate(['../check'], {relativeTo: this.route});
            // this.router.navigate(['/jurisdiction/${this.case.case_jurisdiction}/casetype/${this.case.case_type_id}/viewcase/${this.case.id}/hearing/check']);
            // this.redirectionService.redirect(`/jurisdiction/${this.case.case_jurisdiction}/casetype/${this.case.case_type_id}/viewcase/${this.case.id}/hearing/check`);
            // this.hearingService.storeDraftHearing(this.case.id, values.notes)
            //     .subscribe(
            //         () => this.redirectionService.redirect(`/jurisdiction/${this.case.case_jurisdiction}/casetype/${this.case.case_type_id}/viewcase/${this.case.id}/hearing/check`),
            //         error => this.error.server = true
            //     );
        } else {
            this.error.notes = !this.form.controls.notes.valid;
        }
    }
}
