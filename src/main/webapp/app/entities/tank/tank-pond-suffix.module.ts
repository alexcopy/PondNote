import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PondNotesSharedModule } from '../../shared';
import { PondNotesAdminModule } from '../../admin/admin.module';

import {
    TankPondSuffixService,
    TankPondSuffixPopupService,
    TankPondSuffixComponent,
    TankPondSuffixDetailComponent,
    TankPondSuffixDialogComponent,
    TankPondSuffixPopupComponent,
    TankPondSuffixDeletePopupComponent,
    TankPondSuffixDeleteDialogComponent,
    tankRoute,
    tankPopupRoute,
} from './';

let ENTITY_STATES = [
    ...tankRoute,
    ...tankPopupRoute,
];

@NgModule({
    imports: [
        PondNotesSharedModule,
        PondNotesAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TankPondSuffixComponent,
        TankPondSuffixDetailComponent,
        TankPondSuffixDialogComponent,
        TankPondSuffixDeleteDialogComponent,
        TankPondSuffixPopupComponent,
        TankPondSuffixDeletePopupComponent,
    ],
    entryComponents: [
        TankPondSuffixComponent,
        TankPondSuffixDialogComponent,
        TankPondSuffixPopupComponent,
        TankPondSuffixDeleteDialogComponent,
        TankPondSuffixDeletePopupComponent,
    ],
    providers: [
        TankPondSuffixService,
        TankPondSuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PondNotesTankPondSuffixModule {}
