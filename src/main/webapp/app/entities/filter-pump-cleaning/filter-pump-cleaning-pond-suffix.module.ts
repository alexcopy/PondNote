import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PondNotesSharedModule } from '../../shared';

import {
    FilterPumpCleaningPondSuffixService,
    FilterPumpCleaningPondSuffixPopupService,
    FilterPumpCleaningPondSuffixComponent,
    FilterPumpCleaningPondSuffixDetailComponent,
    FilterPumpCleaningPondSuffixDialogComponent,
    FilterPumpCleaningPondSuffixPopupComponent,
    FilterPumpCleaningPondSuffixDeletePopupComponent,
    FilterPumpCleaningPondSuffixDeleteDialogComponent,
    filterPumpCleaningRoute,
    filterPumpCleaningPopupRoute,
    FilterPumpCleaningPondSuffixResolvePagingParams,
} from './';

let ENTITY_STATES = [
    ...filterPumpCleaningRoute,
    ...filterPumpCleaningPopupRoute,
];

@NgModule({
    imports: [
        PondNotesSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        FilterPumpCleaningPondSuffixComponent,
        FilterPumpCleaningPondSuffixDetailComponent,
        FilterPumpCleaningPondSuffixDialogComponent,
        FilterPumpCleaningPondSuffixDeleteDialogComponent,
        FilterPumpCleaningPondSuffixPopupComponent,
        FilterPumpCleaningPondSuffixDeletePopupComponent,
    ],
    entryComponents: [
        FilterPumpCleaningPondSuffixComponent,
        FilterPumpCleaningPondSuffixDialogComponent,
        FilterPumpCleaningPondSuffixPopupComponent,
        FilterPumpCleaningPondSuffixDeleteDialogComponent,
        FilterPumpCleaningPondSuffixDeletePopupComponent,
    ],
    providers: [
        FilterPumpCleaningPondSuffixService,
        FilterPumpCleaningPondSuffixPopupService,
        FilterPumpCleaningPondSuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PondNotesFilterPumpCleaningPondSuffixModule {}
