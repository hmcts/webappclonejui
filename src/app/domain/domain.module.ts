import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { SharedModule } from '../shared/shared.module';
import { CaseViewerModule } from './case-viewer/case-viewer.module';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateQuestionsComponent } from './components/questions/create/create.component';
import { CheckQuestionsComponent } from './components/questions/check/check.component';
import { ViewQuestionComponent } from './components/questions/view/view.component';
import { DeleteQuestionComponent } from './components/questions/delete/delete.component';
import { EditQuestionComponent } from './components/questions/edit/edit.component';
import { CaseBarDetailsComponent } from './components/casebar-details/casebar-details.component';
import { CaseBarComponent } from './components/casebar/casebar.component';
import { HearingMakeComponent } from './components/hearings/hearing-make/hearing-make.component';
import { DecisionMakeComponent } from './components/decisions/decision-make/decision-make.component';
import { DecisionCheckComponent } from './components/decisions/decision-check/decision-check.component';
import { HearingConfirmationComponent } from './components/hearings/hearing-confirmation/hearing-confirmation.component';
import { DecisionConfirmationComponent } from './components/decisions/decision-confirmation/decision-confirmation.component';
import { HearingCheckComponent } from './components/hearings/hearing-check/hearing-check.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        CaseBarDetailsComponent,
        CaseBarComponent,
        SearchResultComponent,
        HeaderComponent,
        CaseViewerModule,
        CreateQuestionsComponent,
        CheckQuestionsComponent,
        ViewQuestionComponent,
        DeleteQuestionComponent,
        EditQuestionComponent,
        DecisionMakeComponent,
        DecisionCheckComponent,
        DecisionConfirmationComponent,
        HearingMakeComponent,
        HearingCheckComponent,
        HearingConfirmationComponent,
    ],
    declarations: [
        CaseBarDetailsComponent,
        CaseBarComponent,
        SearchResultComponent,
        HeaderComponent,
        CreateQuestionsComponent,
        CheckQuestionsComponent,
        ViewQuestionComponent,
        DeleteQuestionComponent,
        EditQuestionComponent,
        DecisionMakeComponent,
        DecisionCheckComponent,
        DecisionConfirmationComponent,
        HearingMakeComponent,
        HearingCheckComponent,
        HearingConfirmationComponent,
    ],
    providers: []
})
export class DomainModule {
}
