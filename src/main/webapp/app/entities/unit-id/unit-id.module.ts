import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PondNotesSharedModule } from '../../shared';

import {
    UnitIdService,
    UnitIdPopupService,
    UnitIdComponent,
    UnitIdDetailComponent,
    UnitIdDialogComponent,
    UnitIdPopupComponent,
    UnitIdDeletePopupComponent,
    UnitIdDeleteDialogComponent,
    unitIdRoute,
    unitIdPopupRoute,
} from './';

let ENTITY_STATES = [
    ...unitIdRoute,
    ...unitIdPopupRoute,
];

@NgModule({
    imports: [
        PondNotesSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        UnitIdComponent,
        UnitIdDetailComponent,
        UnitIdDialogComponent,
        UnitIdDeleteDialogComponent,
        UnitIdPopupComponent,
        UnitIdDeletePopupComponent,
    ],
    entryComponents: [
        UnitIdComponent,
        UnitIdDialogComponent,
        UnitIdPopupComponent,
        UnitIdDeleteDialogComponent,
        UnitIdDeletePopupComponent,
    ],
    providers: [
        UnitIdService,
        UnitIdPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PondNotesUnitIdModule {}
