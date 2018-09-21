import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionNotesComponent } from './decision-notes.component';

describe('DecisionNotesComponent', () => {
  let component: DecisionNotesComponent;
  let fixture: ComponentFixture<DecisionNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecisionNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
