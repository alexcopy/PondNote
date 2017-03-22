import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PondNotesSharedModule } from '../../shared';

import {
    OtherWorksPondSuffixService,
    OtherWorksPondSuffixPopupService,
    OtherWorksPondSuffixComponent,
    OtherWorksPondSuffixDetailComponent,
    OtherWorksPondSuffixDialogComponent,
    OtherWorksPondSuffixPopupComponent,
    OtherWorksPondSuffixDeletePopupComponent,
    OtherWorksPondSuffixDeleteDialogComponent,
    otherWorksRoute,
    otherWorksPopupRoute,
} from './';

let ENTITY_STATES = [
    ...otherWorksRoute,
    ...otherWorksPopupRoute,
];

@NgModule({
    imports: [
        PondNotesSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        OtherWorksPondSuffixComponent,
        OtherWorksPondSuffixDetailComponent,
        OtherWorksPondSuffixDialogComponent,
        OtherWorksPondSuffixDeleteDialogComponent,
        OtherWorksPondSuffixPopupComponent,
        OtherWorksPondSuffixDeletePopupComponent,
    ],
    entryComponents: [
        OtherWorksPondSuffixComponent,
        OtherWorksPondSuffixDialogComponent,
        OtherWorksPondSuffixPopupComponent,
        OtherWorksPondSuffixDeleteDialogComponent,
        OtherWorksPondSuffixDeletePopupComponent,
    ],
    providers: [
        OtherWorksPondSuffixService,
        OtherWorksPondSuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PondNotesOtherWorksPondSuffixModule {}
