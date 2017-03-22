import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PondNotesSharedModule } from '../../shared';

import {
    ChemicalsPondSuffixService,
    ChemicalsPondSuffixPopupService,
    ChemicalsPondSuffixComponent,
    ChemicalsPondSuffixDetailComponent,
    ChemicalsPondSuffixDialogComponent,
    ChemicalsPondSuffixPopupComponent,
    ChemicalsPondSuffixDeletePopupComponent,
    ChemicalsPondSuffixDeleteDialogComponent,
    chemicalsRoute,
    chemicalsPopupRoute,
    ChemicalsPondSuffixResolvePagingParams,
} from './';

let ENTITY_STATES = [
    ...chemicalsRoute,
    ...chemicalsPopupRoute,
];

@NgModule({
    imports: [
        PondNotesSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ChemicalsPondSuffixComponent,
        ChemicalsPondSuffixDetailComponent,
        ChemicalsPondSuffixDialogComponent,
        ChemicalsPondSuffixDeleteDialogComponent,
        ChemicalsPondSuffixPopupComponent,
        ChemicalsPondSuffixDeletePopupComponent,
    ],
    entryComponents: [
        ChemicalsPondSuffixComponent,
        ChemicalsPondSuffixDialogComponent,
        ChemicalsPondSuffixPopupComponent,
        ChemicalsPondSuffixDeleteDialogComponent,
        ChemicalsPondSuffixDeletePopupComponent,
    ],
    providers: [
        ChemicalsPondSuffixService,
        ChemicalsPondSuffixPopupService,
        ChemicalsPondSuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PondNotesChemicalsPondSuffixModule {}
