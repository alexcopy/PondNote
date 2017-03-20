import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PondNotesSharedModule } from '../../shared';

import {
    WaterCounterService,
    WaterCounterPopupService,
    WaterCounterComponent,
    WaterCounterDetailComponent,
    WaterCounterDialogComponent,
    WaterCounterPopupComponent,
    WaterCounterDeletePopupComponent,
    WaterCounterDeleteDialogComponent,
    waterCounterRoute,
    waterCounterPopupRoute,
    WaterCounterResolvePagingParams,
} from './';

let ENTITY_STATES = [
    ...waterCounterRoute,
    ...waterCounterPopupRoute,
];

@NgModule({
    imports: [
        PondNotesSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        WaterCounterComponent,
        WaterCounterDetailComponent,
        WaterCounterDialogComponent,
        WaterCounterDeleteDialogComponent,
        WaterCounterPopupComponent,
        WaterCounterDeletePopupComponent,
    ],
    entryComponents: [
        WaterCounterComponent,
        WaterCounterDialogComponent,
        WaterCounterPopupComponent,
        WaterCounterDeleteDialogComponent,
        WaterCounterDeletePopupComponent,
    ],
    providers: [
        WaterCounterService,
        WaterCounterPopupService,
        WaterCounterResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PondNotesWaterCounterModule {}
