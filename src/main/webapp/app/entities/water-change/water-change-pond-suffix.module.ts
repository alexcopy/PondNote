import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PondNotesSharedModule } from '../../shared';

import {
    WaterChangePondSuffixService,
    WaterChangePondSuffixPopupService,
    WaterChangePondSuffixComponent,
    WaterChangePondSuffixDetailComponent,
    WaterChangePondSuffixDialogComponent,
    WaterChangePondSuffixPopupComponent,
    WaterChangePondSuffixDeletePopupComponent,
    WaterChangePondSuffixDeleteDialogComponent,
    waterChangeRoute,
    waterChangePopupRoute,
} from './';

let ENTITY_STATES = [
    ...waterChangeRoute,
    ...waterChangePopupRoute,
];

@NgModule({
    imports: [
        PondNotesSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        WaterChangePondSuffixComponent,
        WaterChangePondSuffixDetailComponent,
        WaterChangePondSuffixDialogComponent,
        WaterChangePondSuffixDeleteDialogComponent,
        WaterChangePondSuffixPopupComponent,
        WaterChangePondSuffixDeletePopupComponent,
    ],
    entryComponents: [
        WaterChangePondSuffixComponent,
        WaterChangePondSuffixDialogComponent,
        WaterChangePondSuffixPopupComponent,
        WaterChangePondSuffixDeleteDialogComponent,
        WaterChangePondSuffixDeletePopupComponent,
    ],
    providers: [
        WaterChangePondSuffixService,
        WaterChangePondSuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PondNotesWaterChangePondSuffixModule {}
