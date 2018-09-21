import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-decision-notes',
  templateUrl: './decision-notes.component.html',
  styleUrls: ['./decision-notes.component.scss']
})
export class DecisionNotesComponent implements OnInit {
    formNotes: any;
    name: string;
    id: string;


    constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.name = 'notes';
        this.id = 'notes';
        this.formNotes = new FormGroup ({
            textArea: new FormControl ()
        });
    }


    onSubmit() {
        // Validate here
        // if valid go to summary


        // if (this.formNotes.controls.radioButtons.value === 'no') {
        //     this.router.navigate(['../reject-reasons'], {relativeTo: this.activatedRoute});
        // } else {
        //     this.router.navigate(['../decision-notes'], {relativeTo: this.activatedRoute});
        // }
    }

}
