import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PondNotesSharedModule } from '../../shared';

import {
    ChemicalAnalysisPondSuffixService,
    ChemicalAnalysisPondSuffixPopupService,
    ChemicalAnalysisPondSuffixComponent,
    ChemicalAnalysisPondSuffixDetailComponent,
    ChemicalAnalysisPondSuffixDialogComponent,
    ChemicalAnalysisPondSuffixPopupComponent,
    ChemicalAnalysisPondSuffixDeletePopupComponent,
    ChemicalAnalysisPondSuffixDeleteDialogComponent,
    chemicalAnalysisRoute,
    chemicalAnalysisPopupRoute,
    ChemicalAnalysisPondSuffixResolvePagingParams,
} from './';

let ENTITY_STATES = [
    ...chemicalAnalysisRoute,
    ...chemicalAnalysisPopupRoute,
];

@NgModule({
    imports: [
        PondNotesSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ChemicalAnalysisPondSuffixComponent,
        ChemicalAnalysisPondSuffixDetailComponent,
        ChemicalAnalysisPondSuffixDialogComponent,
        ChemicalAnalysisPondSuffixDeleteDialogComponent,
        ChemicalAnalysisPondSuffixPopupComponent,
        ChemicalAnalysisPondSuffixDeletePopupComponent,
    ],
    entryComponents: [
        ChemicalAnalysisPondSuffixComponent,
        ChemicalAnalysisPondSuffixDialogComponent,
        ChemicalAnalysisPondSuffixPopupComponent,
        ChemicalAnalysisPondSuffixDeleteDialogComponent,
        ChemicalAnalysisPondSuffixDeletePopupComponent,
    ],
    providers: [
        ChemicalAnalysisPondSuffixService,
        ChemicalAnalysisPondSuffixPopupService,
        ChemicalAnalysisPondSuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PondNotesChemicalAnalysisPondSuffixModule {}
