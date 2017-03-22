import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PondNotesSharedModule } from '../../shared';

import {
    LocationPondSuffixService,
    LocationPondSuffixPopupService,
    LocationPondSuffixComponent,
    LocationPondSuffixDetailComponent,
    LocationPondSuffixDialogComponent,
    LocationPondSuffixPopupComponent,
    LocationPondSuffixDeletePopupComponent,
    LocationPondSuffixDeleteDialogComponent,
    locationRoute,
    locationPopupRoute,
} from './';

let ENTITY_STATES = [
    ...locationRoute,
    ...locationPopupRoute,
];

@NgModule({
    imports: [
        PondNotesSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        LocationPondSuffixComponent,
        LocationPondSuffixDetailComponent,
        LocationPondSuffixDialogComponent,
        LocationPondSuffixDeleteDialogComponent,
        LocationPondSuffixPopupComponent,
        LocationPondSuffixDeletePopupComponent,
    ],
    entryComponents: [
        LocationPondSuffixComponent,
        LocationPondSuffixDialogComponent,
        LocationPondSuffixPopupComponent,
        LocationPondSuffixDeleteDialogComponent,
        LocationPondSuffixDeletePopupComponent,
    ],
    providers: [
        LocationPondSuffixService,
        LocationPondSuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PondNotesLocationPondSuffixModule {}
