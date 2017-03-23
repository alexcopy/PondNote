import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PondNotesSharedModule } from '../../shared';
import { PondNotesAdminModule } from '../../admin/admin.module';

import {
    DevicePondSuffixService,
    DevicePondSuffixPopupService,
    DevicePondSuffixComponent,
    DevicePondSuffixDetailComponent,
    DevicePondSuffixDialogComponent,
    DevicePondSuffixPopupComponent,
    DevicePondSuffixDeletePopupComponent,
    DevicePondSuffixDeleteDialogComponent,
    deviceRoute,
    devicePopupRoute,
} from './';

let ENTITY_STATES = [
    ...deviceRoute,
    ...devicePopupRoute,
];

@NgModule({
    imports: [
        PondNotesSharedModule,
        PondNotesAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        DevicePondSuffixComponent,
        DevicePondSuffixDetailComponent,
        DevicePondSuffixDialogComponent,
        DevicePondSuffixDeleteDialogComponent,
        DevicePondSuffixPopupComponent,
        DevicePondSuffixDeletePopupComponent,
    ],
    entryComponents: [
        DevicePondSuffixComponent,
        DevicePondSuffixDialogComponent,
        DevicePondSuffixPopupComponent,
        DevicePondSuffixDeleteDialogComponent,
        DevicePondSuffixDeletePopupComponent,
    ],
    providers: [
        DevicePondSuffixService,
        DevicePondSuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PondNotesDevicePondSuffixModule {}
