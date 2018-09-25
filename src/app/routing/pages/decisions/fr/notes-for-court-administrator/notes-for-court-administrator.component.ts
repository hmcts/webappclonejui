import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-notes-for-court-administrator',
  templateUrl: './notes-for-court-administrator.component.html',
  styleUrls: ['./notes-for-court-administrator.component.scss']
})
export class NotesForCourtAdministratorComponent implements OnInit {
    notesForCourtAdminForm: any;
    constructor() { }

    ngOnInit() {
        this.notesForCourtAdminForm = new FormGroup ({

        });
    }

}
