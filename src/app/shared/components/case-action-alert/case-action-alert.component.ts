import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-case-action-alert',
  templateUrl: './case-action-alert.component.html',
  styleUrls: ['./case-action-alert.component.scss']
})
export class CaseActionAlertComponent implements OnInit {


    @Input() title = 'Decision needed';
    @Input() href = '#';
    @Input() status;
    state = '';

  constructor() { }

  ngOnInit() {
      const status = this.status;
      if (this.status.ID) {
          this.href = `../${this.status.actionGoTo}/${this.status.ID}`;
          this.state = this.status.name;
      } else {
          this.href = (this.status.actionGoTo);
          this.state = this.status.name;
      }
  }

}
