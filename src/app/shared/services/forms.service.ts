import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormsService {
    FormControls = [];
    checked = null;
    constructor() { }
    create(someJson) {
        if (typeof someJson === 'object') {
            for (const prop in someJson) {
                // if (prop === 'radioGroup') {
                //     if (someJson[prop] === 'control') {
                //         if (someJson.checked) {
                //             this.checked = item.value;
                //         } else {
                //             this.checked = null;
                //         }
                //         this.FormControls[someJson.control] = new FormControl( someJson.value );
                //     }
                // }
                if (prop === 'control') {
                    this.FormControls[someJson.control] = new FormControl( someJson.value );
                }
                this.create(someJson[prop]);
            }
        }
        if (someJson !== undefined && someJson.isArray) {
            for (const item  of someJson) {
                this.create(someJson[item]);
            }
        }
    }
    defineformControls(someJson: any): any {
        this.create(someJson);
        return this.FormControls;
    }
}
