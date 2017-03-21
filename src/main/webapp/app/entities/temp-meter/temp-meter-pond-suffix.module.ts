import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PondNotesSharedModule } from '../../shared';

import {
    TempMeterPondSuffixService,
    TempMeterPondSuffixPopupService,
    TempMeterPondSuffixComponent,
    TempMeterPondSuffixDetailComponent,
    TempMeterPondSuffixDialogComponent,
    TempMeterPondSuffixPopupComponent,
    TempMeterPondSuffixDeletePopupComponent,
    TempMeterPondSuffixDeleteDialogComponent,
    tempMeterRoute,
    tempMeterPopupRoute,
} from './';

let ENTITY_STATES = [
    ...tempMeterRoute,
    ...tempMeterPopupRoute,
];

@NgModule({
    imports: [
        PondNotesSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TempMeterPondSuffixComponent,
        TempMeterPondSuffixDetailComponent,
        TempMeterPondSuffixDialogComponent,
        TempMeterPondSuffixDeleteDialogComponent,
        TempMeterPondSuffixPopupComponent,
        TempMeterPondSuffixDeletePopupComponent,
    ],
    entryComponents: [
        TempMeterPondSuffixComponent,
        TempMeterPondSuffixDialogComponent,
        TempMeterPondSuffixPopupComponent,
        TempMeterPondSuffixDeleteDialogComponent,
        TempMeterPondSuffixDeletePopupComponent,
    ],
    providers: [
        TempMeterPondSuffixService,
        TempMeterPondSuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PondNotesTempMeterPondSuffixModule {}
