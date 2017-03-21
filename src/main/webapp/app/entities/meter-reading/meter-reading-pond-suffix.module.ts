import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PondNotesSharedModule } from '../../shared';

import {
    MeterReadingPondSuffixService,
    MeterReadingPondSuffixPopupService,
    MeterReadingPondSuffixComponent,
    MeterReadingPondSuffixDetailComponent,
    MeterReadingPondSuffixDialogComponent,
    MeterReadingPondSuffixPopupComponent,
    MeterReadingPondSuffixDeletePopupComponent,
    MeterReadingPondSuffixDeleteDialogComponent,
    meterReadingRoute,
    meterReadingPopupRoute,
    MeterReadingPondSuffixResolvePagingParams,
} from './';

let ENTITY_STATES = [
    ...meterReadingRoute,
    ...meterReadingPopupRoute,
];

@NgModule({
    imports: [
        PondNotesSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MeterReadingPondSuffixComponent,
        MeterReadingPondSuffixDetailComponent,
        MeterReadingPondSuffixDialogComponent,
        MeterReadingPondSuffixDeleteDialogComponent,
        MeterReadingPondSuffixPopupComponent,
        MeterReadingPondSuffixDeletePopupComponent,
    ],
    entryComponents: [
        MeterReadingPondSuffixComponent,
        MeterReadingPondSuffixDialogComponent,
        MeterReadingPondSuffixPopupComponent,
        MeterReadingPondSuffixDeleteDialogComponent,
        MeterReadingPondSuffixDeletePopupComponent,
    ],
    providers: [
        MeterReadingPondSuffixService,
        MeterReadingPondSuffixPopupService,
        MeterReadingPondSuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PondNotesMeterReadingPondSuffixModule {}
