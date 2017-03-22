import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PondNotesSharedModule } from '../../shared';

import {
    LiveStockPondSuffixService,
    LiveStockPondSuffixPopupService,
    LiveStockPondSuffixComponent,
    LiveStockPondSuffixDetailComponent,
    LiveStockPondSuffixDialogComponent,
    LiveStockPondSuffixPopupComponent,
    LiveStockPondSuffixDeletePopupComponent,
    LiveStockPondSuffixDeleteDialogComponent,
    liveStockRoute,
    liveStockPopupRoute,
    LiveStockPondSuffixResolvePagingParams,
} from './';

let ENTITY_STATES = [
    ...liveStockRoute,
    ...liveStockPopupRoute,
];

@NgModule({
    imports: [
        PondNotesSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        LiveStockPondSuffixComponent,
        LiveStockPondSuffixDetailComponent,
        LiveStockPondSuffixDialogComponent,
        LiveStockPondSuffixDeleteDialogComponent,
        LiveStockPondSuffixPopupComponent,
        LiveStockPondSuffixDeletePopupComponent,
    ],
    entryComponents: [
        LiveStockPondSuffixComponent,
        LiveStockPondSuffixDialogComponent,
        LiveStockPondSuffixPopupComponent,
        LiveStockPondSuffixDeleteDialogComponent,
        LiveStockPondSuffixDeletePopupComponent,
    ],
    providers: [
        LiveStockPondSuffixService,
        LiveStockPondSuffixPopupService,
        LiveStockPondSuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PondNotesLiveStockPondSuffixModule {}
