import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PondNotesSharedModule } from '../../shared';

import {
    DataTempService,
    DataTempPopupService,
    DataTempComponent,
    DataTempDetailComponent,
    DataTempDialogComponent,
    DataTempPopupComponent,
    DataTempDeletePopupComponent,
    DataTempDeleteDialogComponent,
    dataTempRoute,
    dataTempPopupRoute,
    DataTempResolvePagingParams,
} from './';

let ENTITY_STATES = [
    ...dataTempRoute,
    ...dataTempPopupRoute,
];

@NgModule({
    imports: [
        PondNotesSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        DataTempComponent,
        DataTempDetailComponent,
        DataTempDialogComponent,
        DataTempDeleteDialogComponent,
        DataTempPopupComponent,
        DataTempDeletePopupComponent,
    ],
    entryComponents: [
        DataTempComponent,
        DataTempDialogComponent,
        DataTempPopupComponent,
        DataTempDeleteDialogComponent,
        DataTempDeletePopupComponent,
    ],
    providers: [
        DataTempService,
        DataTempPopupService,
        DataTempResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PondNotesDataTempModule {}
